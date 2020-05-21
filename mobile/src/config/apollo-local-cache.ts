import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import introspectionQueryResultData from '../generated/fragment-matcher.json';

export const localCache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
  freezeResults: true,
});

export function initLocalCache(): void {
  localCache.writeData({
    data: {
      token: {
        __typename: 'Token',
        id: 'statictokenid',
        value: '',
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
    },
  });
}
