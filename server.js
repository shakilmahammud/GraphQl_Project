import * as dotenv from 'dotenv' 
dotenv.config()
import {ApolloServer,gql} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import mongoose from 'mongoose';
import typeDefs from './schemaGql.js'

const mongoUrl=process.env.MONGO_URL
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
mongoose.connection.on("connected",()=>{
    console.log("connected to MongoDB")
})
mongoose.connection.on("error",(err)=>{
    console.log("err connecting",err)
})
import './models/User.js'
import './models/Quotes.js'
import resolvers from './resolvers.js'

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});