import { gql } from '@apollo/client';

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
