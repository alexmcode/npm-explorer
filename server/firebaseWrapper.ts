// Import the functions you need from the SDKs you need
import * as firebaseSdk from "firebase-admin"
import { GQLPageQuery } from "generated/graphqlTypes";
import { ID, PageNode, PaginatedList } from "interfaces";
import { isNil, isUndefined, omitBy } from "lodash";
import { Logger } from "Logger";
import { getEnvString } from "../utils/env";
import { expiresIn } from "./cookies";
import * as paginatedLists from "utils/paginatedLists"

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const DATABASE_URL = process.env.NEXT_PUBLIC_FIREBASE_DB_URL
const CLIENT_EMAIL = getEnvString("FIREBASE_CLIENT_EMAIL")
const PRIVATE_KEY = getEnvString("FIREBASE_PRIVATE_KEY")

const Log = Logger("server/firebase")

if (firebaseSdk.apps.length === 0) {
  firebaseSdk.initializeApp({
    credential: firebaseSdk.credential.cert({
      projectId: PROJECT_ID,
      privateKey: PRIVATE_KEY,
      clientEmail: CLIENT_EMAIL,
    }),
    databaseURL: DATABASE_URL,
  })
}

export interface DBResult<DBType> {
  id: ID
  dbVal: DBType
}

interface PutObjectArgs<DBType> {
  input: DBType
  path: string
  id?: ID
}

interface UpdateObjectArgs<DBType> {
  input: Partial<DBType>
  path: string
  id: ID
}


export async function verifySessionCookie(
  cookie: string,
): Promise<firebaseSdk.auth.DecodedIdToken> {
  return await firebaseSdk.auth().verifySessionCookie(cookie, true)
}

export async function createSessionCookie(idToken: string): Promise<string> {
  return await firebaseSdk.auth().createSessionCookie(idToken, {
    expiresIn: expiresIn,
  })
}


export async function getDocByPath<T>(
  path: string,
  collection: string,
): Promise<DBResult<T> | undefined> {
  const dbQuery = await firebaseSdk
    .app()
    .database()
    .ref(collection)
    .child(path)
    .once("value")

  const dbVal = dbQuery.val()

  if (!dbVal) {
    return undefined
  }

  if (!!dbVal && !!dbQuery.key) {
    return {
      id: dbQuery.key,
      dbVal: dbVal as T,
    }
  }
}

export async function putObject<DBType>({
  input: rawInput,
  path,
  id,
}: PutObjectArgs<DBType>): Promise<DBResult<DBType>> {
  const input = omitBy(rawInput, isUndefined)
  const L = Log.fork("putObject")

  const db = firebaseSdk.app().database()

  if (id !== undefined) {
    await db.ref(path).child(id).set(input)
    const snapshot = await db.ref(path).child(id).once("value")
    const dbVal = snapshot.val()

    L.debug(`${path}/${id} updated, input`, input, "result", dbVal)
    return { id: id, dbVal: snapshot.val() as DBType }
  }

  const newRef = db.ref(path).push()
  await newRef.set(input)
  const snapshot = await newRef.once("value")

  if (snapshot.key === null) {
    L.warn("No object id assigned", snapshot.val())
    throw new Error("No object id assigned")
  }

  const dbVal: DBType = snapshot.val()
  const key = snapshot.key

  L.debug(`${path}/${key} created`, dbVal)
  return { id: key, dbVal }
}

export async function updateObject<DBType>({
  input: rawInput,
  path,
  id,
}: UpdateObjectArgs<DBType>): Promise<DBResult<DBType>> {
  const input = omitBy(rawInput, isUndefined)
  const L = Log.fork("updateObject")

  const db = firebaseSdk.app().database()
  const ref = db.ref(path).child(id)

  await ref.update(input)

  const snapshot = await ref.once("value")
  const dbVal: DBType = snapshot.val()

  L.debug(`${path}/${id} success, input:`, input, "result: ", dbVal)
  return { id: id, dbVal }
}

export interface DBMap<DBType> {
  [key: string]: DBType
}

export interface ReducerArgs<DBType> {
  dbKeys: ID[]
  dbMap: DBMap<DBType>
}

export async function listSourcePaginated<DBType>(
  source: DBMap<DBType> | Promise<DBMap<DBType>>,
  pageQuery: GQLPageQuery,
  reducer?: (
    args: ReducerArgs<DBType>,
  ) => ReducerArgs<DBType> | Promise<ReducerArgs<DBType>>,
): Promise<PaginatedList<DBResult<DBType>, ID>> {
  const edges: Array<PageNode<DBResult<DBType>, ID>> = []
  let endCursor: ID | undefined

  const dbMap = await source

  if (isNil(dbMap)) {
    return paginatedLists.emptyWithTotalCount(0)
  }

  let dbKeys = Object.keys(dbMap)

  if (!!reducer) {
    const temp = reducer({ dbKeys, dbMap })
    dbKeys = (temp as Promise<ReducerArgs<DBType>>).then
      ? (await temp).dbKeys
      : (temp as ReducerArgs<DBType>).dbKeys
  }

  const totalCount = dbKeys.length

  if (!!pageQuery.after) {
    const afterIndex = dbKeys.indexOf(pageQuery.after)
    if (afterIndex > -1) {
      dbKeys = dbKeys.slice(afterIndex)
    }
  }

  const skip = pageQuery.skip ?? 0
  const hasNextPage = dbKeys.length > skip + pageQuery.first
  dbKeys = dbKeys.slice(skip, skip + pageQuery.first)

  for (const key of dbKeys) {
    endCursor = key
    const dbVal: DBType = dbMap[key]

    edges.push({
      cursor: key,
      node: {
        id: key,
        dbVal,
      },
    })
  }

  return {
    totalCount,
    pageInfo: {
      endCursor,
      hasNextPage,
    },
    edges,
  }
}

export async function collection<DBType>(path: string): Promise<DBMap<DBType>> {
  const db = firebaseSdk.app().database()
  const snapshot = await db.ref(path).orderByKey().once("value")
  return snapshot.val() ?? {}
}

export async function listCollectionPaginated<DBType>(
  collectionName: string,
  pageQuery: GQLPageQuery,
  reducer?: (
    args: ReducerArgs<DBType>,
  ) => ReducerArgs<DBType> | Promise<ReducerArgs<DBType>>,
): Promise<PaginatedList<DBResult<DBType>, ID>> {
  return await listSourcePaginated<DBType>(
    collection(collectionName),
    pageQuery,
    reducer,
  )
}