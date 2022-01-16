import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Link = {
  __typename?: 'Link';
  category?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  bookmarkLink?: Maybe<Link>;
};


export type MutationBookmarkLinkArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  favorites?: Maybe<Array<Maybe<Link>>>;
  links?: Maybe<Array<Maybe<Link>>>;
};


export type QueryLinksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  favorites?: Maybe<Array<Maybe<Link>>>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<Role>;
};

export type AllLinksQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type AllLinksQuery = { __typename?: 'Query', links?: Array<{ __typename?: 'Link', index?: number | null | undefined, imageUrl?: string | null | undefined, url?: string | null | undefined, title?: string | null | undefined, category?: string | null | undefined, description?: string | null | undefined, id?: string | null | undefined } | null | undefined> | null | undefined };

export type FavoriteLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoriteLinksQuery = { __typename?: 'Query', favorites?: Array<{ __typename?: 'Link', title?: string | null | undefined, id?: string | null | undefined, url?: string | null | undefined, imageUrl?: string | null | undefined, description?: string | null | undefined, category?: string | null | undefined } | null | undefined> | null | undefined };

export type BookmarkLinkMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type BookmarkLinkMutation = { __typename?: 'Mutation', bookmarkLink?: { __typename?: 'Link', title?: string | null | undefined, url?: string | null | undefined, imageUrl?: string | null | undefined, category?: string | null | undefined, description?: string | null | undefined } | null | undefined };


export const AllLinksDocument = gql`
    query allLinks($offset: Int, $limit: Int) {
  links(offset: $offset, limit: $limit) {
    index
    imageUrl
    url
    title
    category
    description
    id
  }
}
    `;

/**
 * __useAllLinksQuery__
 *
 * To run a query within a React component, call `useAllLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllLinksQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAllLinksQuery(baseOptions?: Apollo.QueryHookOptions<AllLinksQuery, AllLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        
return Apollo.useQuery<AllLinksQuery, AllLinksQueryVariables>(AllLinksDocument, options);
      }
export function useAllLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllLinksQuery, AllLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          
return Apollo.useLazyQuery<AllLinksQuery, AllLinksQueryVariables>(AllLinksDocument, options);
        }
export type AllLinksQueryHookResult = ReturnType<typeof useAllLinksQuery>;
export type AllLinksLazyQueryHookResult = ReturnType<typeof useAllLinksLazyQuery>;
export type AllLinksQueryResult = Apollo.QueryResult<AllLinksQuery, AllLinksQueryVariables>;
export const FavoriteLinksDocument = gql`
    query favoriteLinks {
  favorites {
    title
    id
    url
    imageUrl
    description
    category
  }
}
    `;

/**
 * __useFavoriteLinksQuery__
 *
 * To run a query within a React component, call `useFavoriteLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useFavoriteLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFavoriteLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useFavoriteLinksQuery(baseOptions?: Apollo.QueryHookOptions<FavoriteLinksQuery, FavoriteLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        
return Apollo.useQuery<FavoriteLinksQuery, FavoriteLinksQueryVariables>(FavoriteLinksDocument, options);
      }
export function useFavoriteLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FavoriteLinksQuery, FavoriteLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          
return Apollo.useLazyQuery<FavoriteLinksQuery, FavoriteLinksQueryVariables>(FavoriteLinksDocument, options);
        }
export type FavoriteLinksQueryHookResult = ReturnType<typeof useFavoriteLinksQuery>;
export type FavoriteLinksLazyQueryHookResult = ReturnType<typeof useFavoriteLinksLazyQuery>;
export type FavoriteLinksQueryResult = Apollo.QueryResult<FavoriteLinksQuery, FavoriteLinksQueryVariables>;
export const BookmarkLinkDocument = gql`
    mutation bookmarkLink($id: String!) {
  bookmarkLink(id: $id) {
    title
    url
    imageUrl
    category
    description
  }
}
    `;
export type BookmarkLinkMutationFn = Apollo.MutationFunction<BookmarkLinkMutation, BookmarkLinkMutationVariables>;

/**
 * __useBookmarkLinkMutation__
 *
 * To run a mutation, you first call `useBookmarkLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBookmarkLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bookmarkLinkMutation, { data, loading, error }] = useBookmarkLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookmarkLinkMutation(baseOptions?: Apollo.MutationHookOptions<BookmarkLinkMutation, BookmarkLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        
return Apollo.useMutation<BookmarkLinkMutation, BookmarkLinkMutationVariables>(BookmarkLinkDocument, options);
      }
export type BookmarkLinkMutationHookResult = ReturnType<typeof useBookmarkLinkMutation>;
export type BookmarkLinkMutationResult = Apollo.MutationResult<BookmarkLinkMutation>;
export type BookmarkLinkMutationOptions = Apollo.BaseMutationOptions<BookmarkLinkMutation, BookmarkLinkMutationVariables>;