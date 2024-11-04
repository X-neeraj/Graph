const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');
import { userResolver } from "./resolvers/user.resolver";
import { userTypeDefs } from "./typeDefs/user.type";
import { postTypeDefs } from "./typeDefs/post.type";
import { postResolver } from "./resolvers/post.resolver";

const typesArray = loadFilesSync(path.join(__dirname, './typeDefs'), { extensions: ['ts'] });
const resolversArray = loadFilesSync(path.join(__dirname, './resolvers'), { extensions: ['ts'] });
// const mergedTypeDefs = mergeTypeDefs(typesArray);

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs,postTypeDefs],
  resolvers: [userResolver,postResolver],
});

export default schema;
