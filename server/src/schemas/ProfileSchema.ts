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
    # rewards
    angelLikes: [UserQuery!]!
    angelNominates: [UserQuery!]!
    braveLikes: [UserQuery!]!
    braveNominates: [UserQuery!]!
    calmingLikes: [UserQuery!]!
    calmingNominates: [UserQuery!]!
    chatLikes: [UserQuery!]!
    chatNominates: [UserQuery!]!
    funnyLikes: [UserQuery!]!
    funnyNominates: [UserQuery!]!
    helpfulLikes: [UserQuery!]!
    helpfulNominates: [UserQuery!]!
    honsetLikes: [UserQuery!]!
    honsetNominates: [UserQuery!]!
    smartLikes: [UserQuery!]!
    smartNominates: [UserQuery!]!
    survivorLikes: [UserQuery!]!
    survivorNominates: [UserQuery!]!
  }

  input RewardInput {
    user: ID!
    type: RewardsEnum
    nominate: Boolean
  }

  # generates into client
  enum RewardsEnum {
    angel
    brave
    calming
    chatty
    funny
    helpful
    honest
    smart
    survivor
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
  }

  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    rewardProfile(input: RewardInput): Profile
    deleteProfile: Profile
    updateProfile(input: ProfileInput): Profile
  }
`;
