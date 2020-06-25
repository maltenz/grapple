import { gql } from 'apollo-server';

export const ProfileSchema = gql`
  type Profile {
    id: ID!
    user: UserQuery!
    bio: String!
    theme: Theme!
    location: String!
    rewards: [Rewards!]!
    phone: String!
    posts: [Post!]!
    active: Date!
  }

  type Rewards {
    angel: Reward
    brave: Reward
    calming: Reward
    chat: Reward
    funny: Reward
    helpful: Reward
    honset: Reward
    smart: Reward
    survivor: Reward
  }

  type Reward {
    likes: [UserQuery]
    nominated: [UserQuery]
  }

  input RewardInput {
    user: ID!
    reward: RewardsEnum
    nominate: Boolean
  }

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
    location: String!
  }

  extend type Query {
    profile(id: String!): Profile!
  }

  extend type Mutation {
    createProfile(input: ProfileInput): Profile
    rewardProfile(input: RewardInput): Rewards
    deleteProfile: Profile
    updateProfile(input: ProfileInput): Profile
  }
`;
