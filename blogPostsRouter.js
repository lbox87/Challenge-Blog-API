// note to self (nts): always include express framework to receive the request and response objects
const express = require("express");

// nts: include express router in order to modularize and link files together
const router = express.Router();

// using express router, calls on the model models.js where it is defined from the line:
// module.exports = {BlogPosts: createBlogPostsModel()};
const { BlogPosts } = require("./models");