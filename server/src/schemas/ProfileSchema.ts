import { gql } from 'apollo-server';

export const ProfileSchema = gql`
  type Profile {
    id: ID!
    user: UserQuery!
    bio: String!
    theme: Theme!
    location: String!
    phone: String!
    posts: [Post!]!
    active: Date!
  }

  type Theme {
    primaryColor: String!
    secondaryColor: String!
  }

  input ThemeInput {
    primaryColor: String!
    secondaryColor: String!
  }

  input ProfileInput {
    bio: String
    phone: String
    active: Date
    theme: ThemeInput
    location: String
  }

  extend type Query {
    profile(id: String!): Profile!
    authProfile: Profile!
  }

  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    deleteProfile: Profile
    updateProfile(input: ProfileInput): Profile
  }
`;
