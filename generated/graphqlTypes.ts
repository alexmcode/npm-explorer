import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: number;
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
  signOut: Scalars['Boolean'];
};


export type GQLMutationCreateSessionCookieArgs = {
  session: GQLCreateSessionCookieInput;
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
  testQ: GQLTestResult;
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


export type GQLQueryTestQArgs = {
  param: Scalars['String'];
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

export type GQLTestResult = {
  __typename?: 'TestResult';
  package: Scalars['String'];
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GQLResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Contributor: ResolverTypeWrapper<GQLContributor>;
  CreateSessionCookieInput: GQLCreateSessionCookieInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  IdToken: ResolverTypeWrapper<GQLIdToken>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Myself: ResolverTypeWrapper<GQLMyself>;
  NpmPackage: ResolverTypeWrapper<GQLNpmPackage>;
  NpmPackageVersion: ResolverTypeWrapper<GQLNpmPackageVersion>;
  NpmPackageVersionEdge: ResolverTypeWrapper<GQLNpmPackageVersionEdge>;
  NpmPackageVersionPaginatedList: ResolverTypeWrapper<GQLNpmPackageVersionPaginatedList>;
  NpmSuggestion: ResolverTypeWrapper<GQLNpmSuggestion>;
  NpmSuggestionsQuery: GQLNpmSuggestionsQuery;
  PageInfo: ResolverTypeWrapper<GQLPageInfo>;
  PageQuery: GQLPageQuery;
  Query: ResolverTypeWrapper<{}>;
  SignInWithEmailInput: GQLSignInWithEmailInput;
  SortDirection: GQLSortDirection;
  SortKeyDirectionPair: GQLSortKeyDirectionPair;
  String: ResolverTypeWrapper<Scalars['String']>;
  TestResult: ResolverTypeWrapper<GQLTestResult>;
  UserRole: GQLUserRole;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type GQLResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Contributor: GQLContributor;
  CreateSessionCookieInput: GQLCreateSessionCookieInput;
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  IdToken: GQLIdToken;
  Int: Scalars['Int'];
  Mutation: {};
  Myself: GQLMyself;
  NpmPackage: GQLNpmPackage;
  NpmPackageVersion: GQLNpmPackageVersion;
  NpmPackageVersionEdge: GQLNpmPackageVersionEdge;
  NpmPackageVersionPaginatedList: GQLNpmPackageVersionPaginatedList;
  NpmSuggestion: GQLNpmSuggestion;
  NpmSuggestionsQuery: GQLNpmSuggestionsQuery;
  PageInfo: GQLPageInfo;
  PageQuery: GQLPageQuery;
  Query: {};
  SignInWithEmailInput: GQLSignInWithEmailInput;
  SortKeyDirectionPair: GQLSortKeyDirectionPair;
  String: Scalars['String'];
  TestResult: GQLTestResult;
}>;

export type GQLContributorResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Contributor'] = GQLResolversParentTypes['Contributor']> = ResolversObject<{
  email?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface GQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GQLResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type GQLIdTokenResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['IdToken'] = GQLResolversParentTypes['IdToken']> = ResolversObject<{
  expiresIn?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  idToken?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLMutationResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Mutation'] = GQLResolversParentTypes['Mutation']> = ResolversObject<{
  createSessionCookie?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLMutationCreateSessionCookieArgs, 'session'>>;
  signOut?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type GQLMyselfResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Myself'] = GQLResolversParentTypes['Myself']> = ResolversObject<{
  email?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Array<GQLResolversTypes['String']>, ParentType, ContextType>;
  signInEmail?: Resolver<Maybe<GQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLNpmPackageResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NpmPackage'] = GQLResolversParentTypes['NpmPackage']> = ResolversObject<{
  author?: Resolver<Maybe<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  latestVersion?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<GQLResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLNpmPackageVersionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NpmPackageVersion'] = GQLResolversParentTypes['NpmPackageVersion']> = ResolversObject<{
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  license?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  maintainers?: Resolver<Array<GQLResolversTypes['Contributor']>, ParentType, ContextType>;
  numberOfDeps?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  numberOfDevDeps?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLNpmPackageVersionEdgeResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NpmPackageVersionEdge'] = GQLResolversParentTypes['NpmPackageVersionEdge']> = ResolversObject<{
  cursor?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  node?: Resolver<GQLResolversTypes['NpmPackageVersion'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLNpmPackageVersionPaginatedListResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NpmPackageVersionPaginatedList'] = GQLResolversParentTypes['NpmPackageVersionPaginatedList']> = ResolversObject<{
  edges?: Resolver<Array<GQLResolversTypes['NpmPackageVersionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<GQLResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<GQLResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLNpmSuggestionResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['NpmSuggestion'] = GQLResolversParentTypes['NpmSuggestion']> = ResolversObject<{
  description?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<GQLResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  version?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLPageInfoResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['PageInfo'] = GQLResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<GQLResolversTypes['ID']>, ParentType, ContextType>;
  hasNextPage?: Resolver<GQLResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLQueryResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['Query'] = GQLResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<GQLResolversTypes['Myself'], ParentType, ContextType>;
  npmPackageDetails?: Resolver<GQLResolversTypes['NpmPackage'], ParentType, ContextType, RequireFields<GQLQueryNpmPackageDetailsArgs, 'packageId' | 'shouldFetchFromRegistry'>>;
  npmPackageVersions?: Resolver<GQLResolversTypes['NpmPackageVersionPaginatedList'], ParentType, ContextType, RequireFields<GQLQueryNpmPackageVersionsArgs, 'packageId'>>;
  npmSuggestions?: Resolver<Array<GQLResolversTypes['NpmSuggestion']>, ParentType, ContextType, RequireFields<GQLQueryNpmSuggestionsArgs, 'term'>>;
  printNpmPackageDepsTree?: Resolver<GQLResolversTypes['String'], ParentType, ContextType, RequireFields<GQLQueryPrintNpmPackageDepsTreeArgs, 'packageId' | 'packageVersion'>>;
  testQ?: Resolver<GQLResolversTypes['TestResult'], ParentType, ContextType, RequireFields<GQLQueryTestQArgs, 'param'>>;
}>;

export type GQLTestResultResolvers<ContextType = any, ParentType extends GQLResolversParentTypes['TestResult'] = GQLResolversParentTypes['TestResult']> = ResolversObject<{
  package?: Resolver<GQLResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GQLResolvers<ContextType = any> = ResolversObject<{
  Contributor?: GQLContributorResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  IdToken?: GQLIdTokenResolvers<ContextType>;
  Mutation?: GQLMutationResolvers<ContextType>;
  Myself?: GQLMyselfResolvers<ContextType>;
  NpmPackage?: GQLNpmPackageResolvers<ContextType>;
  NpmPackageVersion?: GQLNpmPackageVersionResolvers<ContextType>;
  NpmPackageVersionEdge?: GQLNpmPackageVersionEdgeResolvers<ContextType>;
  NpmPackageVersionPaginatedList?: GQLNpmPackageVersionPaginatedListResolvers<ContextType>;
  NpmSuggestion?: GQLNpmSuggestionResolvers<ContextType>;
  PageInfo?: GQLPageInfoResolvers<ContextType>;
  Query?: GQLQueryResolvers<ContextType>;
  TestResult?: GQLTestResultResolvers<ContextType>;
}>;

