/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from 'graphql-tag';
import * as React from 'react';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  pager: Pager;
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
  pullModalVisible: Scalars['Boolean'];
  shot?: Maybe<Shot>;
  shots?: Maybe<Array<Maybe<Shot>>>;
  user?: Maybe<UserQuery>;
  userByEmail?: Maybe<UserQuery>;
  users?: Maybe<Array<Maybe<UserQuery>>>;
};

export type QueryPostArgs = {
  id: Scalars['String'];
};

export type QueryShotArgs = {
  id: Scalars['String'];
};

export type QueryShotsArgs = {
  id: Scalars['String'];
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  createUser?: Maybe<User>;
  deleteUser?: Maybe<User>;
  loginUser?: Maybe<Token>;
  createPost?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  createShot?: Maybe<Shot>;
  deleteShot?: Maybe<Shot>;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  input?: Maybe<AuthUserInput>;
};

export type MutationLoginUserArgs = {
  input?: Maybe<AuthUserInput>;
};

export type MutationDeletePostArgs = {
  id: Scalars['String'];
};

export type MutationCreateShotArgs = {
  input?: Maybe<ShotInput>;
};

export type MutationDeleteShotArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type UserQuery = {
  __typename?: 'UserQuery';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  email: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Token = {
  __typename?: 'Token';
  token: Scalars['String'];
};

export type CreateUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type AuthUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  user: UserQuery;
  shots: Array<Maybe<Shot>>;
};

export type Shot = {
  __typename?: 'Shot';
  id: Scalars['ID'];
  user: UserQuery;
  post: Post;
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
};

export type ShotInput = {
  post: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Pager = {
  __typename?: 'Pager';
  id: Scalars['ID'];
  activeIndex: Scalars['Int'];
  count: Scalars['Int'];
  visible?: Maybe<Scalars['Boolean']>;
};

export type PagerDataFragment = { __typename: 'Pager' } & Pick<
  Pager,
  'id' | 'activeIndex' | 'count' | 'visible'
>;

export type GetPagerQueryVariables = {};

export type GetPagerQuery = { __typename?: 'Query' } & {
  pager: { __typename: 'Pager' } & Pick<Pager, 'id' | 'activeIndex' | 'count' | 'visible'>;
};

export const PagerDataFragmentDoc = gql`
  fragment pagerData on Pager {
    id
    __typename
    activeIndex @client
    count @client
    visible @client
  }
`;
export const GetPagerDocument = gql`
  query GetPager {
    pager @client {
      id
      __typename
      activeIndex
      count
      visible
    }
  }
`;
export type GetPagerComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetPagerQuery, GetPagerQueryVariables>,
  'query'
>;

export const GetPagerComponent = (props: GetPagerComponentProps) => (
  <ApolloReactComponents.Query<GetPagerQuery, GetPagerQueryVariables>
    query={GetPagerDocument}
    {...props}
  />
);

export type GetPagerProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  GetPagerQuery,
  GetPagerQueryVariables
> &
  TChildProps;
export function withGetPager<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPagerQuery,
    GetPagerQueryVariables,
    GetPagerProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetPagerQuery,
    GetPagerQueryVariables,
    GetPagerProps<TChildProps>
  >(GetPagerDocument, {
    alias: 'getPager',
    ...operationOptions,
  });
}

/**
 * __useGetPagerQuery__
 *
 * To run a query within a React component, call `useGetPagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPagerQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPagerQuery, GetPagerQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPagerQuery, GetPagerQueryVariables>(
    GetPagerDocument,
    baseOptions
  );
}
export function useGetPagerLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPagerQuery, GetPagerQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPagerQuery, GetPagerQueryVariables>(
    GetPagerDocument,
    baseOptions
  );
}
export type GetPagerQueryHookResult = ReturnType<typeof useGetPagerQuery>;
export type GetPagerLazyQueryHookResult = ReturnType<typeof useGetPagerLazyQuery>;
export type GetPagerQueryResult = ApolloReactCommon.QueryResult<
  GetPagerQuery,
  GetPagerQueryVariables
>;

export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string;
      name: string;
      possibleTypes: {
        name: string;
      }[];
    }[];
  };
}
const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
};
export default result;
