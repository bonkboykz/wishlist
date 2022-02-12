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
      author {
        id
        name
        email
      }
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

export const UpdateLinkMutationDocument = gql`
  mutation updateLink(
    $id: String!
    $title: String
    $url: String
    $imageUrl: String
    $category: String
    $description: String
  ) {
    updateLink(
      id: $id
      title: $title
      url: $url
      imageUrl: $imageUrl
      category: $category
      description: $description
    ) {
      id
      title
      url
      imageUrl
      category
      description
      author {
        id
        name
        email
      }
    }
  }
`;
