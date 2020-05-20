import { gql } from 'apollo-boost';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
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
  /** Get a specific character by ID */
  character?: Maybe<Character>;
  /** Get the list of all characters */
  characters?: Maybe<Characters>;
  /** Get a specific episode by ID */
  episode?: Maybe<Episode>;
  /** Get the list of all episodes */
  episodes?: Maybe<Episodes>;
  getCharacter?: Maybe<Character>;
  /** Get a specific locations by ID */
  location?: Maybe<Location>;
  /** Get the list of all locations */
  locations?: Maybe<Locations>;
  shoppingCart: ShoppingCart;
};

export type QueryCharacterArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryCharactersArgs = {
  page?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterCharacter>;
};

export type QueryEpisodeArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryEpisodesArgs = {
  page?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterEpisode>;
};

export type QueryGetCharacterArgs = {
  id: Scalars['ID'];
};

export type QueryLocationArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryLocationsArgs = {
  page?: Maybe<Scalars['Int']>;
  filter?: Maybe<FilterLocation>;
};

export type Character = {
  __typename?: 'Character';
  chosenQuantity: Scalars['Int'];
  /** Time at which the character was created in the database. */
  created?: Maybe<Scalars['String']>;
  /** Episodes in which this character appeared. */
  episode?: Maybe<Array<Maybe<Episode>>>;
  /** The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
  gender?: Maybe<Scalars['String']>;
  /** The id of the character. */
  id?: Maybe<Scalars['ID']>;
  /**
   * Link to the character's image.
   * All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
   */
  image?: Maybe<Scalars['String']>;
  /** The character's last known location */
  location?: Maybe<Location>;
  /** The name of the character. */
  name?: Maybe<Scalars['String']>;
  /** The character's origin location */
  origin?: Maybe<Location>;
  /** The species of the character. */
  species?: Maybe<Scalars['String']>;
  /** The status of the character ('Alive', 'Dead' or 'unknown'). */
  status?: Maybe<Scalars['String']>;
  /** The type or subspecies of the character. */
  type?: Maybe<Scalars['String']>;
  unitPrice: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  /** The id of the location. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the location. */
  name?: Maybe<Scalars['String']>;
  /** The type of the location. */
  type?: Maybe<Scalars['String']>;
  /** The dimension in which the location is located. */
  dimension?: Maybe<Scalars['String']>;
  /** List of characters who have been last seen in the location. */
  residents?: Maybe<Array<Maybe<Character>>>;
  /** Time at which the location was created in the database. */
  created?: Maybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  /** The id of the episode. */
  id?: Maybe<Scalars['ID']>;
  /** The name of the episode. */
  name?: Maybe<Scalars['String']>;
  /** The air date of the episode. */
  air_date?: Maybe<Scalars['String']>;
  /** The code of the episode. */
  episode?: Maybe<Scalars['String']>;
  /** List of characters who have been seen in the episode. */
  characters?: Maybe<Array<Maybe<Character>>>;
  /** Time at which the episode was created in the database. */
  created?: Maybe<Scalars['String']>;
};

export type FilterCharacter = {
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  species?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
};

export type Characters = {
  __typename?: 'Characters';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Character>>>;
};

export type Info = {
  __typename?: 'Info';
  /** The length of the response. */
  count?: Maybe<Scalars['Int']>;
  /** The amount of pages. */
  pages?: Maybe<Scalars['Int']>;
  /** Number of the next page (if it exists) */
  next?: Maybe<Scalars['Int']>;
  /** Number of the previous page (if it exists) */
  prev?: Maybe<Scalars['Int']>;
};

export type FilterLocation = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  dimension?: Maybe<Scalars['String']>;
};

export type Locations = {
  __typename?: 'Locations';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Location>>>;
};

export type FilterEpisode = {
  name?: Maybe<Scalars['String']>;
  episode?: Maybe<Scalars['String']>;
};

export type Episodes = {
  __typename?: 'Episodes';
  info?: Maybe<Info>;
  results?: Maybe<Array<Maybe<Episode>>>;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type Mutation = {
  __typename?: 'Mutation';
  increaseChosenQuantity?: Maybe<Scalars['Boolean']>;
  decreaseChosenQuantity?: Maybe<Scalars['Boolean']>;
};

export type MutationIncreaseChosenQuantityArgs = {
  input: ChangeProductQuantity;
};

export type MutationDecreaseChosenQuantityArgs = {
  input: ChangeProductQuantity;
};

export type ShoppingCart = {
  __typename?: 'ShoppingCart';
  id: Scalars['ID'];
  totalPrice: Scalars['Int'];
  numActionFigures: Scalars['Int'];
};

export type Test = {
  __typename?: 'Test';
  id: Scalars['ID'];
  totalPrice: Scalars['Int'];
  numActionFigures: Scalars['Int'];
};

export type ChangeProductQuantity = {
  id: Scalars['ID'];
};

export type CharacterDataFragment = { __typename: 'Character' } & Pick<
  Character,
  'id' | 'name' | 'unitPrice' | 'chosenQuantity'
>;

export type DecreaseChosenQuantityMutationVariables = {
  input: ChangeProductQuantity;
};

export type DecreaseChosenQuantityMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'decreaseChosenQuantity'
>;

export type GetCharacterQueryVariables = {
  id: Scalars['ID'];
};

export type GetCharacterQuery = { __typename?: 'Query' } & {
  getCharacter?: Maybe<{ __typename?: 'Character' } & CharacterDataFragment>;
};

export type GetCharactersQueryVariables = {};

export type GetCharactersQuery = { __typename?: 'Query' } & {
  characters?: Maybe<
    { __typename: 'Characters' } & {
      results?: Maybe<
        Array<
          Maybe<
            { __typename: 'Character' } & Pick<
              Character,
              'id' | 'name' | 'image' | 'species' | 'chosenQuantity' | 'unitPrice'
            > & {
                origin?: Maybe<{ __typename: 'Location' } & Pick<Location, 'id' | 'name'>>;
                location?: Maybe<{ __typename: 'Location' } & Pick<Location, 'id' | 'name'>>;
              }
          >
        >
      >;
    }
  >;
};

export type GetShoppingCartQueryVariables = {};

export type GetShoppingCartQuery = { __typename?: 'Query' } & {
  shoppingCart: { __typename: 'ShoppingCart' } & Pick<
    ShoppingCart,
    'id' | 'totalPrice' | 'numActionFigures'
  >;
};

export type IncreaseChosenQuantityMutationVariables = {
  input: ChangeProductQuantity;
};

export type IncreaseChosenQuantityMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'increaseChosenQuantity'
>;

export const CharacterDataFragmentDoc = gql`
  fragment characterData on Character {
    id
    __typename
    name
    unitPrice @client
    chosenQuantity @client
  }
`;
export const DecreaseChosenQuantityDocument = gql`
  mutation DecreaseChosenQuantity($input: ChangeProductQuantity!) {
    decreaseChosenQuantity(input: $input) @client
  }
`;
export type DecreaseChosenQuantityMutationFn = ApolloReactCommon.MutationFunction<
  DecreaseChosenQuantityMutation,
  DecreaseChosenQuantityMutationVariables
>;
export type DecreaseChosenQuantityComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables
  >,
  'mutation'
>;

export const DecreaseChosenQuantityComponent = (props: DecreaseChosenQuantityComponentProps) => (
  <ApolloReactComponents.Mutation<
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables
  >
    mutation={DecreaseChosenQuantityDocument}
    {...props}
  />
);

export type DecreaseChosenQuantityProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables
  >;
} &
  TChildProps;
export function withDecreaseChosenQuantity<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables,
    DecreaseChosenQuantityProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables,
    DecreaseChosenQuantityProps<TChildProps, TDataName>
  >(DecreaseChosenQuantityDocument, {
    alias: 'decreaseChosenQuantity',
    ...operationOptions,
  });
}

/**
 * __useDecreaseChosenQuantityMutation__
 *
 * To run a mutation, you first call `useDecreaseChosenQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecreaseChosenQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decreaseChosenQuantityMutation, { data, loading, error }] = useDecreaseChosenQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDecreaseChosenQuantityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    DecreaseChosenQuantityMutation,
    DecreaseChosenQuantityMutationVariables
  >(DecreaseChosenQuantityDocument, baseOptions);
}
export type DecreaseChosenQuantityMutationHookResult = ReturnType<
  typeof useDecreaseChosenQuantityMutation
>;
export type DecreaseChosenQuantityMutationResult = ApolloReactCommon.MutationResult<
  DecreaseChosenQuantityMutation
>;
export type DecreaseChosenQuantityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DecreaseChosenQuantityMutation,
  DecreaseChosenQuantityMutationVariables
>;
export const GetCharacterDocument = gql`
  query GetCharacter($id: ID!) {
    getCharacter(id: $id) @client {
      ...characterData
    }
  }
  ${CharacterDataFragmentDoc}
`;
export type GetCharacterComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCharacterQuery, GetCharacterQueryVariables>,
  'query'
> &
  ({ variables: GetCharacterQueryVariables; skip?: boolean } | { skip: boolean });

export const GetCharacterComponent = (props: GetCharacterComponentProps) => (
  <ApolloReactComponents.Query<GetCharacterQuery, GetCharacterQueryVariables>
    query={GetCharacterDocument}
    {...props}
  />
);

export type GetCharacterProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCharacterQuery, GetCharacterQueryVariables>;
} &
  TChildProps;
export function withGetCharacter<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCharacterQuery,
    GetCharacterQueryVariables,
    GetCharacterProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCharacterQuery,
    GetCharacterQueryVariables,
    GetCharacterProps<TChildProps, TDataName>
  >(GetCharacterDocument, {
    alias: 'getCharacter',
    ...operationOptions,
  });
}

/**
 * __useGetCharacterQuery__
 *
 * To run a query within a React component, call `useGetCharacterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharacterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharacterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCharacterQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetCharacterQuery, GetCharacterQueryVariables>(
    GetCharacterDocument,
    baseOptions
  );
}
export function useGetCharacterLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCharacterQuery, GetCharacterQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetCharacterQuery, GetCharacterQueryVariables>(
    GetCharacterDocument,
    baseOptions
  );
}
export type GetCharacterQueryHookResult = ReturnType<typeof useGetCharacterQuery>;
export type GetCharacterLazyQueryHookResult = ReturnType<typeof useGetCharacterLazyQuery>;
export type GetCharacterQueryResult = ApolloReactCommon.QueryResult<
  GetCharacterQuery,
  GetCharacterQueryVariables
>;
export const GetCharactersDocument = gql`
  query GetCharacters {
    characters {
      __typename
      results {
        id
        __typename
        name
        image
        species
        chosenQuantity @client
        unitPrice @client
        origin {
          id
          __typename
          name
        }
        location {
          id
          __typename
          name
        }
      }
    }
  }
`;
export type GetCharactersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCharactersQuery, GetCharactersQueryVariables>,
  'query'
>;

export const GetCharactersComponent = (props: GetCharactersComponentProps) => (
  <ApolloReactComponents.Query<GetCharactersQuery, GetCharactersQueryVariables>
    query={GetCharactersDocument}
    {...props}
  />
);

export type GetCharactersProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetCharactersQuery, GetCharactersQueryVariables>;
} &
  TChildProps;
export function withGetCharacters<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetCharactersQuery,
    GetCharactersQueryVariables,
    GetCharactersProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetCharactersQuery,
    GetCharactersQueryVariables,
    GetCharactersProps<TChildProps, TDataName>
  >(GetCharactersDocument, {
    alias: 'getCharacters',
    ...operationOptions,
  });
}

/**
 * __useGetCharactersQuery__
 *
 * To run a query within a React component, call `useGetCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCharactersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetCharactersQuery, GetCharactersQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GetCharactersDocument,
    baseOptions
  );
}
export function useGetCharactersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetCharactersQuery,
    GetCharactersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetCharactersQuery, GetCharactersQueryVariables>(
    GetCharactersDocument,
    baseOptions
  );
}
export type GetCharactersQueryHookResult = ReturnType<typeof useGetCharactersQuery>;
export type GetCharactersLazyQueryHookResult = ReturnType<typeof useGetCharactersLazyQuery>;
export type GetCharactersQueryResult = ApolloReactCommon.QueryResult<
  GetCharactersQuery,
  GetCharactersQueryVariables
>;
export const GetShoppingCartDocument = gql`
  query GetShoppingCart {
    shoppingCart @client {
      id
      __typename
      totalPrice
      numActionFigures
    }
  }
`;
export type GetShoppingCartComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetShoppingCartQuery, GetShoppingCartQueryVariables>,
  'query'
>;

export const GetShoppingCartComponent = (props: GetShoppingCartComponentProps) => (
  <ApolloReactComponents.Query<GetShoppingCartQuery, GetShoppingCartQueryVariables>
    query={GetShoppingCartDocument}
    {...props}
  />
);

export type GetShoppingCartProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetShoppingCartQuery, GetShoppingCartQueryVariables>;
} &
  TChildProps;
export function withGetShoppingCart<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetShoppingCartQuery,
    GetShoppingCartQueryVariables,
    GetShoppingCartProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetShoppingCartQuery,
    GetShoppingCartQueryVariables,
    GetShoppingCartProps<TChildProps, TDataName>
  >(GetShoppingCartDocument, {
    alias: 'getShoppingCart',
    ...operationOptions,
  });
}

/**
 * __useGetShoppingCartQuery__
 *
 * To run a query within a React component, call `useGetShoppingCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoppingCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoppingCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShoppingCartQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetShoppingCartQuery,
    GetShoppingCartQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetShoppingCartQuery, GetShoppingCartQueryVariables>(
    GetShoppingCartDocument,
    baseOptions
  );
}
export function useGetShoppingCartLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetShoppingCartQuery,
    GetShoppingCartQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetShoppingCartQuery, GetShoppingCartQueryVariables>(
    GetShoppingCartDocument,
    baseOptions
  );
}
export type GetShoppingCartQueryHookResult = ReturnType<typeof useGetShoppingCartQuery>;
export type GetShoppingCartLazyQueryHookResult = ReturnType<typeof useGetShoppingCartLazyQuery>;
export type GetShoppingCartQueryResult = ApolloReactCommon.QueryResult<
  GetShoppingCartQuery,
  GetShoppingCartQueryVariables
>;
export const IncreaseChosenQuantityDocument = gql`
  mutation IncreaseChosenQuantity($input: ChangeProductQuantity!) {
    increaseChosenQuantity(input: $input) @client
  }
`;
export type IncreaseChosenQuantityMutationFn = ApolloReactCommon.MutationFunction<
  IncreaseChosenQuantityMutation,
  IncreaseChosenQuantityMutationVariables
>;
export type IncreaseChosenQuantityComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables
  >,
  'mutation'
>;

export const IncreaseChosenQuantityComponent = (props: IncreaseChosenQuantityComponentProps) => (
  <ApolloReactComponents.Mutation<
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables
  >
    mutation={IncreaseChosenQuantityDocument}
    {...props}
  />
);

export type IncreaseChosenQuantityProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables
  >;
} &
  TChildProps;
export function withIncreaseChosenQuantity<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables,
    IncreaseChosenQuantityProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables,
    IncreaseChosenQuantityProps<TChildProps, TDataName>
  >(IncreaseChosenQuantityDocument, {
    alias: 'increaseChosenQuantity',
    ...operationOptions,
  });
}

/**
 * __useIncreaseChosenQuantityMutation__
 *
 * To run a mutation, you first call `useIncreaseChosenQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreaseChosenQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increaseChosenQuantityMutation, { data, loading, error }] = useIncreaseChosenQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIncreaseChosenQuantityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    IncreaseChosenQuantityMutation,
    IncreaseChosenQuantityMutationVariables
  >(IncreaseChosenQuantityDocument, baseOptions);
}
export type IncreaseChosenQuantityMutationHookResult = ReturnType<
  typeof useIncreaseChosenQuantityMutation
>;
export type IncreaseChosenQuantityMutationResult = ApolloReactCommon.MutationResult<
  IncreaseChosenQuantityMutation
>;
export type IncreaseChosenQuantityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  IncreaseChosenQuantityMutation,
  IncreaseChosenQuantityMutationVariables
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
