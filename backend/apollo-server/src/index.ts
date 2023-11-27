import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import typeDefs from './schema';
import resolvers from './resolvers';
import {AlbumsAPI, AuthorsAPI, CommentsAPI, PostsAPI} from './datasources';
// import { logger } from './middlewares';

interface SchemaContext {
  dataSources: {
    postsAPI: PostsAPI;
    commentsAPI: CommentsAPI;
    authorsAPI: AuthorsAPI;
    albumsAPI: AlbumsAPI;
  };
}

const server = new ApolloServer<SchemaContext>({
  typeDefs,
  resolvers,
  // plugins: [logger],
});

const standaloneServer = startStandaloneServer(server, {
  listen: {
    port: 3001,
    path: '/graphql',
  },
  context: async () => ({
    dataSources: {
      postsAPI: new PostsAPI(),
      commentsAPI: new CommentsAPI(),
      authorsAPI: new AuthorsAPI(),
      albumsAPI: new AlbumsAPI()
    },
  }),
});

standaloneServer.then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
