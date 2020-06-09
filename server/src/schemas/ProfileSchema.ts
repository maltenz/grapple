import { gql } from 'apollo-server';

export const ProfileSchema = gql`
  type Profile {
    id: ID!
    user: UserQuery!
    bio: String!
    skills: [String!]!
    address: [String!]!
    phone: String!
    posts: [Post!]!
    active: Date!
  }

  input ProfileInput {
    bio: String
    phone: String
    active: Date
  }

  extend type Query {
    profile(id: String!): Profile!
  }

  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    deleteProfile: Profile
    updateProfile(input: ProfileInput): Profile
  }
`;
