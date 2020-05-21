import getPager from '../resolvers/pager';

export const localResolvers = {
  Query: {
    getPager,
  },
  // Mutation: {
  //   increaseChosenQuantity,
  //   decreaseChosenQuantity,
  // },
  // Character: {
  //   chosenQuantity: (): number => 0,
  //   unitPrice: setUnitPrice,
  // },
};
