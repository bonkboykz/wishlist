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

export const CreateLinkMutationDocument = gql`
  mutation createLink(
    $title: String!
    $url: String!
    $imageUrl: String!
    $category: String!
    $description: String!
  ) {
    createLink(
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      title
      url
      imageUrl
      category
      description
    }
  }
`;
