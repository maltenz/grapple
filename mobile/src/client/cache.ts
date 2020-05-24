import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../generated/fragment-matcher.json';

export const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
  freezeResults: true,
});

export const data = {
  signUser: {
    __typename: 'SignUser',
    id: 'staticsignuserid',
    userId: '',
    name: '',
    email: '',
  },
  signShot: {
    __typename: 'SignShot',
    id: 'staticsignshotid',
    title: '',
    content: '',
    image: '',
  },
  pager: {
    __typename: 'Pager',
    id: 'staticpagerid',
    activeIndex: 0,
    count: 4,
    visible: false,
  },
  pullModal: {
    __typename: 'PullModal',
    id: 'staticpullmodalid',
    visible: true,
  },
};
