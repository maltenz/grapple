/* eslint-disable */
import { gql } from 'apollo-boost';


export const UPDATE_PAGER = gql`
  mutation UpdatePager($input: PagerInput!) {
    updatePager(input: $input) @client
  }
`;

export const PagerMutations = {
  // @ts-ignore
  updatePager: (_root, variables, { cache, getCacheKey }) => {
    const id = getCacheKey({ __typename: 'PAGER', id: variables.id });
    
    const fragment = gql`
      fragment completePager on PAGER {
        id
        activeIndex
        count
        visible
      }
    `;

    console.log(variables)


    const myPager = cache.readFragment({ fragment, id });

    const data = { ...myPager };
    cache.writeData({ id, data });
    return null;
  },
};

/* eslint-enable */
