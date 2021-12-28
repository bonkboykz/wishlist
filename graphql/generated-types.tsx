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

export type Edges = {
  __typename?: 'Edges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<Link>;
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

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  links?: Maybe<Response>;
};


export type QueryLinksArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type Response = {
  __typename?: 'Response';
  edges?: Maybe<Array<Maybe<Edges>>>;
  pageInfo?: Maybe<PageInfo>;
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
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type AllLinksQuery = { __typename?: 'Query', links?: { __typename?: 'Response', pageInfo?: { __typename?: 'PageInfo', endCursor?: string | null | undefined, hasNextPage?: boolean | null | undefined } | null | undefined, edges?: Array<{ __typename?: 'Edges', cursor?: string | null | undefined, node?: { __typename?: 'Link', index?: number | null | undefined, imageUrl?: string | null | undefined, url?: string | null | undefined, title?: string | null | undefined, category?: string | null | undefined, description?: string | null | undefined, id?: string | null | undefined } | null | undefined } | null | undefined> | null | undefined } | null | undefined };


export const AllLinksDocument = gql`
    query allLinks($first: Int, $after: String) {
  links(first: $first, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        index
        imageUrl
        url
        title
        category
        description
        id
      }
    }
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
 *      first: // value for 'first'
 *      after: // value for 'after'
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