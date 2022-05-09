import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: number;
};

export type GQLAdvancedSearchNoteInput = {
  message: Scalars['String'];
};

export type GQLAdvancedSearchQuery = {
  searchText: Scalars['String'];
};

export type GQLContributor = {
  __typename?: 'Contributor';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type GQLCreateSessionCookieInput = {
  idToken: Scalars['String'];
};

export type GQLIdToken = {
  __typename?: 'IdToken';
  expiresIn: Scalars['Int'];
  idToken: Scalars['String'];
  refreshToken: Scalars['String'];
  userId: Scalars['ID'];
};

export type GQLMutation = {
  __typename?: 'Mutation';
  createSessionCookie: Scalars['String'];
  doSearchAndSaveHistory: Array<GQLNpmPackage>;
  signOut: Scalars['Boolean'];
};


export type GQLMutationCreateSessionCookieArgs = {
  session: GQLCreateSessionCookieInput;
};


export type GQLMutationDoSearchAndSaveHistoryArgs = {
  input: GQLAdvancedSearchNoteInput;
  query: GQLAdvancedSearchQuery;
};

export type GQLMyself = {
  __typename?: 'Myself';
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  roles: Array<Scalars['String']>;
  signInEmail?: Maybe<Scalars['String']>;
};

export type GQLNpmPackage = {
  __typename?: 'NpmPackage';
  author?: Maybe<GQLContributor>;
  description: Scalars['String'];
  id: Scalars['ID'];
  latestVersion: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GQLNpmPackageVersion = {
  __typename?: 'NpmPackageVersion';
  id: Scalars['ID'];
  license: Scalars['String'];
  maintainers: Array<GQLContributor>;
  numberOfDeps: Scalars['Int'];
  numberOfDevDeps: Scalars['Int'];
};

export type GQLNpmPackageVersionEdge = {
  __typename?: 'NpmPackageVersionEdge';
  cursor: Scalars['ID'];
  node: GQLNpmPackageVersion;
};

export type GQLNpmPackageVersionPaginatedList = {
  __typename?: 'NpmPackageVersionPaginatedList';
  edges: Array<GQLNpmPackageVersionEdge>;
  pageInfo: GQLPageInfo;
  totalCount: Scalars['Int'];
};

export type GQLNpmSuggestion = {
  __typename?: 'NpmSuggestion';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  version: Scalars['String'];
};

export type GQLNpmSuggestionsQuery = {
  id?: InputMaybe<Scalars['ID']>;
};

export type GQLPageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['ID']>;
  hasNextPage: Scalars['Boolean'];
};

export type GQLPageQuery = {
  after?: InputMaybe<Scalars['ID']>;
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Array<GQLSortKeyDirectionPair>>;
};

export type GQLQuery = {
  __typename?: 'Query';
  me: GQLMyself;
  npmPackageDetails: GQLNpmPackage;
  npmPackageVersions: GQLNpmPackageVersionPaginatedList;
  npmSuggestions: Array<GQLNpmSuggestion>;
  printNpmPackageDepsTree: Scalars['String'];
};


export type GQLQueryNpmPackageDetailsArgs = {
  packageId: Scalars['ID'];
  shouldFetchFromRegistry: Scalars['Boolean'];
};


export type GQLQueryNpmPackageVersionsArgs = {
  packageId: Scalars['ID'];
  pageQuery?: InputMaybe<GQLPageQuery>;
};


export type GQLQueryNpmSuggestionsArgs = {
  term: Scalars['String'];
};


export type GQLQueryPrintNpmPackageDepsTreeArgs = {
  packageId: Scalars['ID'];
  packageVersion: Scalars['String'];
};

export type GQLSignInWithEmailInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum GQLSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type GQLSortKeyDirectionPair = {
  key: Scalars['String'];
  sortDirection: GQLSortDirection;
};

export enum GQLUserRole {
  Admin = 'Admin',
  Fleet = 'Fleet',
  Fulfillment = 'Fulfillment',
  Instructor = 'Instructor',
  Manager = 'Manager',
  Student = 'Student',
  Support = 'Support'
}

/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type GQL__Directive = {
  __typename?: '__Directive';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isRepeatable: Scalars['Boolean'];
  locations: Array<GQL__DirectiveLocation>;
  args: Array<GQL__InputValue>;
};


/**
 * A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.
 *
 * In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.
 */
export type GQL__DirectiveArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies. */
export enum GQL__DirectiveLocation {
  /** Location adjacent to a query operation. */
  Query = 'QUERY',
  /** Location adjacent to a mutation operation. */
  Mutation = 'MUTATION',
  /** Location adjacent to a subscription operation. */
  Subscription = 'SUBSCRIPTION',
  /** Location adjacent to a field. */
  Field = 'FIELD',
  /** Location adjacent to a fragment definition. */
  FragmentDefinition = 'FRAGMENT_DEFINITION',
  /** Location adjacent to a fragment spread. */
  FragmentSpread = 'FRAGMENT_SPREAD',
  /** Location adjacent to an inline fragment. */
  InlineFragment = 'INLINE_FRAGMENT',
  /** Location adjacent to a variable definition. */
  VariableDefinition = 'VARIABLE_DEFINITION',
  /** Location adjacent to a schema definition. */
  Schema = 'SCHEMA',
  /** Location adjacent to a scalar definition. */
  Scalar = 'SCALAR',
  /** Location adjacent to an object type definition. */
  Object = 'OBJECT',
  /** Location adjacent to a field definition. */
  FieldDefinition = 'FIELD_DEFINITION',
  /** Location adjacent to an argument definition. */
  ArgumentDefinition = 'ARGUMENT_DEFINITION',
  /** Location adjacent to an interface definition. */
  Interface = 'INTERFACE',
  /** Location adjacent to a union definition. */
  Union = 'UNION',
  /** Location adjacent to an enum definition. */
  Enum = 'ENUM',
  /** Location adjacent to an enum value definition. */
  EnumValue = 'ENUM_VALUE',
  /** Location adjacent to an input object type definition. */
  InputObject = 'INPUT_OBJECT',
  /** Location adjacent to an input object field definition. */
  InputFieldDefinition = 'INPUT_FIELD_DEFINITION'
}

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type GQL__EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type GQL__Field = {
  __typename?: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<GQL__InputValue>;
  type: GQL__Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type GQL__FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type GQL__InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: GQL__Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations. */
export type GQL__Schema = {
  __typename?: '__Schema';
  description?: Maybe<Scalars['String']>;
  /** A list of all types supported by this server. */
  types: Array<GQL__Type>;
  /** The type that query operations will be rooted at. */
  queryType: GQL__Type;
  /** If this server supports mutation, the type that mutation operations will be rooted at. */
  mutationType?: Maybe<GQL__Type>;
  /** If this server support subscription, the type that subscription operations will be rooted at. */
  subscriptionType?: Maybe<GQL__Type>;
  /** A list of all directives supported by this server. */
  directives: Array<GQL__Directive>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type GQL__Type = {
  __typename?: '__Type';
  kind: GQL__TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByURL?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<GQL__Field>>;
  interfaces?: Maybe<Array<GQL__Type>>;
  possibleTypes?: Maybe<Array<GQL__Type>>;
  enumValues?: Maybe<Array<GQL__EnumValue>>;
  inputFields?: Maybe<Array<GQL__InputValue>>;
  ofType?: Maybe<GQL__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type GQL__TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type GQL__TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type GQL__TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum GQL__TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

export type GQLMyIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLMyIdQuery = { __typename?: 'Query', me: { __typename?: 'Myself', id: string } };

export type GQLGetMyselfQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLGetMyselfQuery = { __typename?: 'Query', me: { __typename?: 'Myself', id: string, name: string, email?: string | null, roles: Array<string> } };

export type GQLSchemaQueryVariables = Exact<{ [key: string]: never; }>;


export type GQLSchemaQuery = { __typename?: 'Query', __schema: { __typename?: '__Schema', types: Array<{ __typename?: '__Type', kind: GQL__TypeKind, name?: string | null, possibleTypes?: Array<{ __typename?: '__Type', name?: string | null }> | null }> } };

export type GQLPackageDetailsFragment = { __typename?: 'NpmPackage', id: string, name: string, latestVersion: string, description: string, updatedAt: number, author?: { __typename?: 'Contributor', name: string, email: string } | null };

export type GQLPackageDetailsQueryVariables = Exact<{
  packageId: Scalars['ID'];
  shouldFetchFromRegistry: Scalars['Boolean'];
}>;


export type GQLPackageDetailsQuery = { __typename?: 'Query', npmPackageDetails: { __typename?: 'NpmPackage', id: string, name: string, latestVersion: string, description: string, updatedAt: number, author?: { __typename?: 'Contributor', name: string, email: string } | null } };

export type GQLPrintNpmPackageDepsTreeQueryVariables = Exact<{
  packageId: Scalars['ID'];
  packageVersion: Scalars['String'];
}>;


export type GQLPrintNpmPackageDepsTreeQuery = { __typename?: 'Query', printNpmPackageDepsTree: string };

export type GQLPackageVersionForTableFragment = { __typename?: 'NpmPackageVersion', id: string, license: string, numberOfDeps: number, numberOfDevDeps: number, maintainers: Array<{ __typename?: 'Contributor', id: string, name: string, email: string, url?: string | null }> };

export type GQLPackageVersionsQueryVariables = Exact<{
  packageId: Scalars['ID'];
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type GQLPackageVersionsQuery = { __typename?: 'Query', npmPackageVersions: { __typename?: 'NpmPackageVersionPaginatedList', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'NpmPackageVersionEdge', cursor: string, node: { __typename?: 'NpmPackageVersion', id: string, license: string, numberOfDeps: number, numberOfDevDeps: number, maintainers: Array<{ __typename?: 'Contributor', id: string, name: string, email: string, url?: string | null }> } }> } };

export type GQLListNpmSuggestionsQueryVariables = Exact<{
  term: Scalars['String'];
}>;


export type GQLListNpmSuggestionsQuery = { __typename?: 'Query', npmSuggestions: Array<{ __typename?: 'NpmSuggestion', id: string, name: string, version: string, description: string }> };

export type GQLDoSearchAndSaveHistoryMutationVariables = Exact<{
  query: GQLAdvancedSearchQuery;
  input: GQLAdvancedSearchNoteInput;
}>;


export type GQLDoSearchAndSaveHistoryMutation = { __typename?: 'Mutation', searchResult: Array<{ __typename?: 'NpmPackage', id: string, name: string, updatedAt: number, latestVersion: string, description: string }> };

export const PackageDetailsFragmentDoc = gql`
    fragment PackageDetails on NpmPackage {
  id
  name
  latestVersion
  description
  updatedAt
  author {
    name
    email
  }
}
    `;
export const PackageVersionForTableFragmentDoc = gql`
    fragment PackageVersionForTable on NpmPackageVersion {
  id
  license
  maintainers {
    id
    name
    email
    url
  }
  numberOfDeps
  numberOfDevDeps
}
    `;
export const MyIdDocument = gql`
    query MyId {
  me {
    id
  }
}
    `;

/**
 * __useMyIdQuery__
 *
 * To run a query within a React component, call `useMyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyIdQuery(baseOptions?: Apollo.QueryHookOptions<GQLMyIdQuery, GQLMyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLMyIdQuery, GQLMyIdQueryVariables>(MyIdDocument, options);
      }
export function useMyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLMyIdQuery, GQLMyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLMyIdQuery, GQLMyIdQueryVariables>(MyIdDocument, options);
        }
export type MyIdQueryHookResult = ReturnType<typeof useMyIdQuery>;
export type MyIdLazyQueryHookResult = ReturnType<typeof useMyIdLazyQuery>;
export type MyIdQueryResult = Apollo.QueryResult<GQLMyIdQuery, GQLMyIdQueryVariables>;
export const GetMyselfDocument = gql`
    query GetMyself {
  me {
    id
    name
    email
    roles
  }
}
    `;

/**
 * __useGetMyselfQuery__
 *
 * To run a query within a React component, call `useGetMyselfQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyselfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyselfQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyselfQuery(baseOptions?: Apollo.QueryHookOptions<GQLGetMyselfQuery, GQLGetMyselfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLGetMyselfQuery, GQLGetMyselfQueryVariables>(GetMyselfDocument, options);
      }
export function useGetMyselfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLGetMyselfQuery, GQLGetMyselfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLGetMyselfQuery, GQLGetMyselfQueryVariables>(GetMyselfDocument, options);
        }
export type GetMyselfQueryHookResult = ReturnType<typeof useGetMyselfQuery>;
export type GetMyselfLazyQueryHookResult = ReturnType<typeof useGetMyselfLazyQuery>;
export type GetMyselfQueryResult = Apollo.QueryResult<GQLGetMyselfQuery, GQLGetMyselfQueryVariables>;
export const SchemaDocument = gql`
    query Schema {
  __schema {
    types {
      kind
      name
      possibleTypes {
        name
      }
    }
  }
}
    `;

/**
 * __useSchemaQuery__
 *
 * To run a query within a React component, call `useSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSchemaQuery({
 *   variables: {
 *   },
 * });
 */
export function useSchemaQuery(baseOptions?: Apollo.QueryHookOptions<GQLSchemaQuery, GQLSchemaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLSchemaQuery, GQLSchemaQueryVariables>(SchemaDocument, options);
      }
export function useSchemaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLSchemaQuery, GQLSchemaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLSchemaQuery, GQLSchemaQueryVariables>(SchemaDocument, options);
        }
export type SchemaQueryHookResult = ReturnType<typeof useSchemaQuery>;
export type SchemaLazyQueryHookResult = ReturnType<typeof useSchemaLazyQuery>;
export type SchemaQueryResult = Apollo.QueryResult<GQLSchemaQuery, GQLSchemaQueryVariables>;
export const PackageDetailsDocument = gql`
    query PackageDetails($packageId: ID!, $shouldFetchFromRegistry: Boolean!) {
  npmPackageDetails(
    packageId: $packageId
    shouldFetchFromRegistry: $shouldFetchFromRegistry
  ) {
    ...PackageDetails
  }
}
    ${PackageDetailsFragmentDoc}`;

/**
 * __usePackageDetailsQuery__
 *
 * To run a query within a React component, call `usePackageDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackageDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackageDetailsQuery({
 *   variables: {
 *      packageId: // value for 'packageId'
 *      shouldFetchFromRegistry: // value for 'shouldFetchFromRegistry'
 *   },
 * });
 */
export function usePackageDetailsQuery(baseOptions: Apollo.QueryHookOptions<GQLPackageDetailsQuery, GQLPackageDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLPackageDetailsQuery, GQLPackageDetailsQueryVariables>(PackageDetailsDocument, options);
      }
export function usePackageDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLPackageDetailsQuery, GQLPackageDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLPackageDetailsQuery, GQLPackageDetailsQueryVariables>(PackageDetailsDocument, options);
        }
export type PackageDetailsQueryHookResult = ReturnType<typeof usePackageDetailsQuery>;
export type PackageDetailsLazyQueryHookResult = ReturnType<typeof usePackageDetailsLazyQuery>;
export type PackageDetailsQueryResult = Apollo.QueryResult<GQLPackageDetailsQuery, GQLPackageDetailsQueryVariables>;
export const PrintNpmPackageDepsTreeDocument = gql`
    query PrintNpmPackageDepsTree($packageId: ID!, $packageVersion: String!) {
  printNpmPackageDepsTree(packageId: $packageId, packageVersion: $packageVersion)
}
    `;

/**
 * __usePrintNpmPackageDepsTreeQuery__
 *
 * To run a query within a React component, call `usePrintNpmPackageDepsTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrintNpmPackageDepsTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrintNpmPackageDepsTreeQuery({
 *   variables: {
 *      packageId: // value for 'packageId'
 *      packageVersion: // value for 'packageVersion'
 *   },
 * });
 */
export function usePrintNpmPackageDepsTreeQuery(baseOptions: Apollo.QueryHookOptions<GQLPrintNpmPackageDepsTreeQuery, GQLPrintNpmPackageDepsTreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLPrintNpmPackageDepsTreeQuery, GQLPrintNpmPackageDepsTreeQueryVariables>(PrintNpmPackageDepsTreeDocument, options);
      }
export function usePrintNpmPackageDepsTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLPrintNpmPackageDepsTreeQuery, GQLPrintNpmPackageDepsTreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLPrintNpmPackageDepsTreeQuery, GQLPrintNpmPackageDepsTreeQueryVariables>(PrintNpmPackageDepsTreeDocument, options);
        }
export type PrintNpmPackageDepsTreeQueryHookResult = ReturnType<typeof usePrintNpmPackageDepsTreeQuery>;
export type PrintNpmPackageDepsTreeLazyQueryHookResult = ReturnType<typeof usePrintNpmPackageDepsTreeLazyQuery>;
export type PrintNpmPackageDepsTreeQueryResult = Apollo.QueryResult<GQLPrintNpmPackageDepsTreeQuery, GQLPrintNpmPackageDepsTreeQueryVariables>;
export const PackageVersionsDocument = gql`
    query PackageVersions($packageId: ID!, $first: Int!, $skip: Int) {
  npmPackageVersions(
    packageId: $packageId
    pageQuery: {first: $first, skip: $skip}
  ) {
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      cursor
      node {
        ...PackageVersionForTable
      }
    }
  }
}
    ${PackageVersionForTableFragmentDoc}`;

/**
 * __usePackageVersionsQuery__
 *
 * To run a query within a React component, call `usePackageVersionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePackageVersionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePackageVersionsQuery({
 *   variables: {
 *      packageId: // value for 'packageId'
 *      first: // value for 'first'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function usePackageVersionsQuery(baseOptions: Apollo.QueryHookOptions<GQLPackageVersionsQuery, GQLPackageVersionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLPackageVersionsQuery, GQLPackageVersionsQueryVariables>(PackageVersionsDocument, options);
      }
export function usePackageVersionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLPackageVersionsQuery, GQLPackageVersionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLPackageVersionsQuery, GQLPackageVersionsQueryVariables>(PackageVersionsDocument, options);
        }
export type PackageVersionsQueryHookResult = ReturnType<typeof usePackageVersionsQuery>;
export type PackageVersionsLazyQueryHookResult = ReturnType<typeof usePackageVersionsLazyQuery>;
export type PackageVersionsQueryResult = Apollo.QueryResult<GQLPackageVersionsQuery, GQLPackageVersionsQueryVariables>;
export const ListNpmSuggestionsDocument = gql`
    query ListNpmSuggestions($term: String!) {
  npmSuggestions(term: $term) {
    id
    name
    version
    description
  }
}
    `;

/**
 * __useListNpmSuggestionsQuery__
 *
 * To run a query within a React component, call `useListNpmSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNpmSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNpmSuggestionsQuery({
 *   variables: {
 *      term: // value for 'term'
 *   },
 * });
 */
export function useListNpmSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<GQLListNpmSuggestionsQuery, GQLListNpmSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GQLListNpmSuggestionsQuery, GQLListNpmSuggestionsQueryVariables>(ListNpmSuggestionsDocument, options);
      }
export function useListNpmSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GQLListNpmSuggestionsQuery, GQLListNpmSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GQLListNpmSuggestionsQuery, GQLListNpmSuggestionsQueryVariables>(ListNpmSuggestionsDocument, options);
        }
export type ListNpmSuggestionsQueryHookResult = ReturnType<typeof useListNpmSuggestionsQuery>;
export type ListNpmSuggestionsLazyQueryHookResult = ReturnType<typeof useListNpmSuggestionsLazyQuery>;
export type ListNpmSuggestionsQueryResult = Apollo.QueryResult<GQLListNpmSuggestionsQuery, GQLListNpmSuggestionsQueryVariables>;
export const DoSearchAndSaveHistoryDocument = gql`
    mutation doSearchAndSaveHistory($query: AdvancedSearchQuery!, $input: AdvancedSearchNoteInput!) {
  searchResult: doSearchAndSaveHistory(query: $query, input: $input) {
    id
    name
    updatedAt
    latestVersion
    description
  }
}
    `;
export type GQLDoSearchAndSaveHistoryMutationFn = Apollo.MutationFunction<GQLDoSearchAndSaveHistoryMutation, GQLDoSearchAndSaveHistoryMutationVariables>;

/**
 * __useDoSearchAndSaveHistoryMutation__
 *
 * To run a mutation, you first call `useDoSearchAndSaveHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDoSearchAndSaveHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [doSearchAndSaveHistoryMutation, { data, loading, error }] = useDoSearchAndSaveHistoryMutation({
 *   variables: {
 *      query: // value for 'query'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDoSearchAndSaveHistoryMutation(baseOptions?: Apollo.MutationHookOptions<GQLDoSearchAndSaveHistoryMutation, GQLDoSearchAndSaveHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GQLDoSearchAndSaveHistoryMutation, GQLDoSearchAndSaveHistoryMutationVariables>(DoSearchAndSaveHistoryDocument, options);
      }
export type DoSearchAndSaveHistoryMutationHookResult = ReturnType<typeof useDoSearchAndSaveHistoryMutation>;
export type DoSearchAndSaveHistoryMutationResult = Apollo.MutationResult<GQLDoSearchAndSaveHistoryMutation>;
export type DoSearchAndSaveHistoryMutationOptions = Apollo.BaseMutationOptions<GQLDoSearchAndSaveHistoryMutation, GQLDoSearchAndSaveHistoryMutationVariables>;