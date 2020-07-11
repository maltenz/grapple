export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type AuthUserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type Award = {
   __typename?: 'Award',
  id?: Maybe<Scalars['ID']>,
  award: AwardsEnum,
  nominate: Scalars['Boolean'],
  subscriber?: Maybe<User>,
  owner?: Maybe<User>,
  post?: Maybe<Post>,
};

export type AwardInput = {
  id?: Maybe<Scalars['ID']>,
  award?: Maybe<AwardsEnum>,
  nominate?: Maybe<Scalars['Boolean']>,
  subscriber?: Maybe<Scalars['ID']>,
  owner?: Maybe<Scalars['ID']>,
  post?: Maybe<Scalars['ID']>,
};

export type AwardMetrics = {
   __typename?: 'AwardMetrics',
  angel: AwardMetricsItem,
  brave: AwardMetricsItem,
  calming: AwardMetricsItem,
  chatty: AwardMetricsItem,
  funny: AwardMetricsItem,
  helpful: AwardMetricsItem,
  honest: AwardMetricsItem,
  smart: AwardMetricsItem,
  survivor: AwardMetricsItem,
};

export type AwardMetricsItem = {
   __typename?: 'AwardMetricsItem',
  count: Scalars['Int'],
};

export enum AwardsEnum {
  Angel = 'angel',
  Brave = 'brave',
  Calming = 'calming',
  Chatty = 'chatty',
  Funny = 'funny',
  Helpful = 'helpful',
  Honest = 'honest',
  Smart = 'smart',
  Survivor = 'survivor'
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
   __typename?: 'Comment',
  id?: Maybe<Scalars['ID']>,
  text: Scalars['String'],
  post: Post,
  user: UserQuery,
};

export type CommentInput = {
  id?: Maybe<Scalars['ID']>,
  text: Scalars['String'],
};

export type CreatePost = {
  shots: Array<Maybe<ShotInput>>,
};

export type CreateUserInput = {
  name: Scalars['String'],
  password: Scalars['String'],
  email: Scalars['String'],
};


export type Mutation = {
   __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  createUser?: Maybe<Token>,
  deleteUser?: Maybe<User>,
  loginUser?: Maybe<Token>,
  createPost?: Maybe<Post>,
  deletePost?: Maybe<Post>,
  deletePostShot?: Maybe<Post>,
  updatePostShot?: Maybe<Post>,
  updateWithPositionPostShot?: Maybe<Post>,
  likePost?: Maybe<Post>,
  unlikePost?: Maybe<Post>,
  bookmarkPost?: Maybe<Post>,
  removeBookmarkPost?: Maybe<Post>,
  createComment?: Maybe<Comment>,
  deleteComment?: Maybe<Comment>,
  updateComment?: Maybe<Comment>,
  createProfile?: Maybe<Profile>,
  deleteProfile?: Maybe<Profile>,
  updateProfile?: Maybe<Profile>,
  createAward?: Maybe<Award>,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};


export type MutationDeleteUserArgs = {
  input?: Maybe<AuthUserInput>
};


export type MutationLoginUserArgs = {
  input?: Maybe<AuthUserInput>
};


export type MutationCreatePostArgs = {
  input?: Maybe<CreatePost>
};


export type MutationDeletePostArgs = {
  id: Scalars['String']
};


export type MutationDeletePostShotArgs = {
  input?: Maybe<ShotDeleteInput>
};


export type MutationUpdatePostShotArgs = {
  input?: Maybe<ShotUpdateInput>
};


export type MutationUpdateWithPositionPostShotArgs = {
  input?: Maybe<ShotUpdatePositionInput>
};


export type MutationLikePostArgs = {
  id: Scalars['String']
};


export type MutationUnlikePostArgs = {
  id: Scalars['String']
};


export type MutationBookmarkPostArgs = {
  id: Scalars['String']
};


export type MutationRemoveBookmarkPostArgs = {
  id: Scalars['String']
};


export type MutationCreateCommentArgs = {
  input?: Maybe<CommentInput>
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String']
};


export type MutationUpdateCommentArgs = {
  input?: Maybe<CommentInput>
};


export type MutationCreateProfileArgs = {
  input?: Maybe<ProfileInput>
};


export type MutationUpdateProfileArgs = {
  input?: Maybe<ProfileInput>
};


export type MutationCreateAwardArgs = {
  input: AwardInput
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  user: UserQuery,
  shots: Array<Maybe<Shot>>,
  likes?: Maybe<Array<Maybe<UserQuery>>>,
  liked: Scalars['Boolean'],
  bookmarks?: Maybe<Array<Maybe<UserQuery>>>,
  bookmarked: Scalars['Boolean'],
};

export type Profile = {
   __typename?: 'Profile',
  id: Scalars['ID'],
  user: UserQuery,
  bio: Scalars['String'],
  theme: Theme,
  location: Scalars['String'],
  phone: Scalars['String'],
  posts: Array<Post>,
  active: Scalars['DateTime'],
};

export type ProfileInput = {
  bio?: Maybe<Scalars['String']>,
  phone?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['DateTime']>,
  theme?: Maybe<ThemeInput>,
  location?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
  users?: Maybe<Array<Maybe<UserQuery>>>,
  user?: Maybe<UserQuery>,
  userByEmail?: Maybe<UserQuery>,
  userPosts?: Maybe<Array<Maybe<Post>>>,
  userLiked?: Maybe<Array<Maybe<Post>>>,
  userBookmarked?: Maybe<Array<Maybe<Post>>>,
  posts?: Maybe<Array<Maybe<Post>>>,
  post?: Maybe<Post>,
  comments: Array<Comment>,
  profile: Profile,
  authProfile: Profile,
  award?: Maybe<Award>,
  awards?: Maybe<Array<Maybe<Award>>>,
  awardMetrics?: Maybe<AwardMetrics>,
};


export type QueryUserArgs = {
  id: Scalars['String']
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']
};


export type QueryUserPostsArgs = {
  id: Scalars['String']
};


export type QueryUserLikedArgs = {
  id: Scalars['String']
};


export type QueryUserBookmarkedArgs = {
  id: Scalars['String']
};


export type QueryPostArgs = {
  id: Scalars['String']
};


export type QueryCommentsArgs = {
  id: Scalars['String']
};


export type QueryProfileArgs = {
  id: Scalars['String']
};


export type QueryAwardArgs = {
  input?: Maybe<AwardInput>
};


export type QueryAwardsArgs = {
  input?: Maybe<AwardInput>
};

export type Shot = {
   __typename?: 'Shot',
  id?: Maybe<Scalars['ID']>,
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type ShotDeleteInput = {
  id: Scalars['ID'],
  shotId: Scalars['ID'],
};

export type ShotInput = {
  id?: Maybe<Scalars['ID']>,
  title: Scalars['String'],
  content: Scalars['String'],
  image: Scalars['String'],
};

export type ShotUpdateInput = {
  id: Scalars['ID'],
  shotId: Scalars['ID'],
  title: Scalars['String'],
  content: Scalars['String'],
  image: Scalars['String'],
};

export type ShotUpdatePositionInput = {
  id: Scalars['ID'],
  shotId: Scalars['ID'],
  position: Scalars['Int'],
  title: Scalars['String'],
  content: Scalars['String'],
  image: Scalars['String'],
};

export type Theme = {
   __typename?: 'Theme',
  primaryColor: Scalars['String'],
  secondaryColor: Scalars['String'],
};

export type ThemeInput = {
  primaryColor: Scalars['String'],
  secondaryColor: Scalars['String'],
};

export type Token = {
   __typename?: 'Token',
  id: Scalars['ID'],
  token: Scalars['String'],
  name: Scalars['String'],
  email: Scalars['String'],
};


export type User = {
   __typename?: 'User',
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  email: Scalars['String'],
};

export type UserQuery = {
   __typename?: 'UserQuery',
  id?: Maybe<Scalars['ID']>,
  name: Scalars['String'],
  email: Scalars['String'],
};

import { ObjectID } from 'mongodb';