// import { fetch } from 'react-native';
// import * as routes from '../utils/routes';


// export const setToken = token => ({
//   type: 'TOKEN_SET',
//   payload: token,
// });

// export const removeToken = () => ({
//   type: 'TOKEN_REMOVE',
// });

// export const logout = () => {
//   deleteCookie('lang-cards');
//   return removeToken();
// };

// export const signupRequest = (user) => (store) => {
//   return fetch(`${API_URL}${routes.SIGNUP_ROUTE}`, {
//     method: 'POST',
//     body: user,
//   })
//     .then((response) => {
//       return store.dispatch(setToken(response.body.token));
//     });
// };

// export const loginRequest = (user) => (store) => {
//   return fetch(`${API_URL}${routes.LOGIN_ROUTE}`, {
//     method: 'GET',
//     body: JSON.stringify({
//       user: user.username,
//       password: user.password,
//     }),
//   })
//     .then((response) => {
//       return store.dispatch(setToken(response.body.token));
//     });
// };
