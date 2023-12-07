import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink, from } from '@apollo/client';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';

const removeTypenameLink = removeTypenameFromVariables();

const BASE_URI = import.meta.env.VITE_SERVER_HOST || "http://localhost:4000";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: BASE_URI,
});
const linka = from([removeTypenameLink, httpLink]);
// Set up the middleware to add the token to the request headers
const authMiddleware = new ApolloLink((operation, forward) => {
  // Get the token from wherever you store it (e.g., localStorage, state, etc.)
  const token = localStorage.getItem('access_token') || "no_access_token";

  // Add the token to the request headers
  operation.setContext({
    headers: {
      access_token: token , // Add the token as 'Bearer <token>'
    },
  });

  return forward(operation);
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authMiddleware.concat(linka), // Concatenate the auth middleware with the HTTP link
  cache: new InMemoryCache(),
});

export default client;
