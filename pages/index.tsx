import Head from 'next/head';
import { useCallback, useState } from 'react';

import { AwesomeLink } from '@wishlist-components/AwesomeLink';
import { useAllLinksQuery } from '@wishlist-graphql/generated-types';

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
            />
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
