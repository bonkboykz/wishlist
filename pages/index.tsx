import Head from 'next/head';
import React, { useCallback, useMemo, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import { IconHeart } from '@wishlist-components/Icon/IconHeart';
import {
  useAllLinksQuery,
  useBookmarkLinkMutation,
  useFavoriteLinksQuery,
} from '@wishlist-graphql/generated-types';
import apolloClient from '@wishlist-lib/apollo';
import { FavoriteLinksDocument } from '@wishlist-graphql/documents/user.graphql';

import { AwesomeLink } from '@wishlist-components/AwesomeLink';
import Link from 'next/link';

export default function Home() {
  const { data, loading, error, fetchMore } = useAllLinksQuery({
    variables: { offset: 0 },
  });

  const [showMoreButton, setShowMoreButton] = useState(true);

  const onLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        offset: data.links.length,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (fetchMoreResult.links.length <= 0) {
          setShowMoreButton(false);
        }

        return {
          ...fetchMoreResult,
          links: [...prevResult.links, ...fetchMoreResult.links],
        };
      },
    });
  }, [fetchMore, data]);

  const [isLoading, setIsLoading] = useState(false);
  const [createBookmark] = useBookmarkLinkMutation();

  const { user } = useUser();
  const { data: favoritesData, loading: loadingFavorites } =
    useFavoriteLinksQuery();

  const isLinkBookmarked = useCallback(
    (id) => {
      console.log(favoritesData?.favorites, id);

      return Boolean(favoritesData?.favorites.find((link) => link.id === id));
    },
    [favoritesData],
  );

  const bookmarkLink = useCallback(
    async (id) => {
      setIsLoading(true);

      try {
        await createBookmark({ variables: { id } });
        await apolloClient.refetchQueries({
          include: [FavoriteLinksDocument],
        });
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    },
    [createBookmark],
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto max-w-5xl my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.links.map((link) => (
            <AwesomeLink
              key={link.id}
              title={link.title}
              category={link.category}
              url={link.url}
              id={link.id}
              description={link.description}
              imageUrl={link.imageUrl}
            >
              {user && !loadingFavorites && (
                <button
                  onClick={() => bookmarkLink(link.id)}
                  disabled={isLoading}
                >
                  <IconHeart pressed={isLinkBookmarked(link.id)} />
                </button>
              )}

              {user &&
                (user.email === 'test@admin.com' ||
                  link.author.id === user.sub) && (
                  <Link href={`links/${link.id}`}>Edit</Link>
                )}
            </AwesomeLink>
          ))}
        </div>
        {showMoreButton && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded my-10"
            onClick={onLoadMore}
          >
            more
          </button>
        )}
      </div>
    </div>
  );
}
