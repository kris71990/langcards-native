import { StackActions, NavigationActions } from 'react-navigation';

const resetHomeStack = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Root' })],
});

const goToMenu = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

const goToCards = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Cards' })],
});

export { resetHomeStack, goToMenu, goToCards };
