import { gql } from '@apollo/client';

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

export const BookmarkLinkMutationDocument = gql`
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
