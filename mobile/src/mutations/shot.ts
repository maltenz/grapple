import { gql } from 'apollo-boost';

const CREATE_SHOT = gql`
  mutation createShot($post: ID!, $title: String, $content: String, $image: String) {
    createShot(input: { post: $post, title: $title, content: $content, image: $image }) {
      title
      content
      image
    }
  }
`;

export { CREATE_SHOT };
