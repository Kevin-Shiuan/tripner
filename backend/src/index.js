import { GraphQLServer, PubSub } from 'graphql-yoga';
import * as db from './db';
import mongo from './mongo';
import mongoose from 'mongoose';
import express from "express";
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import Trip from './resolvers/Trip';
import User from './resolvers/User';
import path from "path";

const pubsub = new PubSub();
const experss = require("express");

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription,
    Trip,
    User,
  },
  context: {
    db,
    pubsub,
  },
});

server.express.use(express.static(path.join(__dirname, "../build")));
server.express.get('/*', (req, res, next) => {
  const pathDir = path.join(__dirname, "..", "build", "index.html");
  res.sendFile(pathDir);
});

//mongoDB configuration
mongo();

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    // const PORT = process.env.PORT || 5500;
    // server.start({ PORT }, () => {
    //   console.log(`The server is up on port ${PORT}!`);
    // });
    server.start({ port: process.env.PORT || 5500 }, () => {
      console.log(`The server is up on port ${process.env.PORT || 5500}!`);
    });
});