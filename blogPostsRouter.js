// note to self (nts): always include express framework to receive the request and response objects
const express = require("express");

// nts: include express router in order to modularize and link files together
const router = express.Router();

// using express router, calls on the model models.js where it is defined from the line:
// module.exports = {BlogPosts: createBlogPostsModel()};
const { BlogPosts } = require("./models");

// generate generic lorem text for the blogpost samples below
function lorem() {
  return (
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod " +
    "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
    "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo " +
    "consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse " +
    "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non " +
    "proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
}

// nts: creates a couple blog post objects to use as GET data. 
// Created using the defined 'create' function in the models.js "Blogposts" 
// create: function(title, content, author, publishDate) 
BlogPosts.create("10 things -- you won't believe #4", lorem(), "Billy Bob");
BlogPosts.create("Lions and tigers and bears oh my", lorem(), "Lefty Lil");


// Endpoint for GET requests to root http://localhost:8080/blog-posts/ 
// Returns a json response as defined by the function`BlogPosts.get()`
// in models.js
router.get("/", (req, res) => {
  res.json(BlogPosts.get());
});

// Endpoint for POST requests to root http://localhost:8080/blog-posts/ 
router.post("/", (req, res) => {
// This endpoint should send a 400 error if the post doesn't contain `title`, `content`, and `author`
//  nts: this for loop is a basic way to verify required data in a POST request
// 'requiredFields' is an array of requirements we want in the body of a POST request
  const requiredFields = ["title", "content", "author"];
  // the for loop will cycle through each word
  for (let i = 0; i < requiredFields.length; i++) {
    // and assign them to the field variable
    const field = requiredFields[i];
    // and verifies if that word is in the request body
    if (!(field in req.body)) {
      // if it is not, a 400 error is sent back along with a console log error
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
// add endpoint for POST requests, which should cause a new
// blog post to be added (using `BlogPosts.create()`). It should
// return a JSON object representing the new post (including
// the id, which `BlogPosts` will create. 
  const item = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author
  );
  res.status(201).json(item);
});

// add endpoint for PUT requests to update blogposts. it should
// call `BlogPosts.update()` and return the updated post.
// it should also ensure that the id in the object representing
// the post matches the id of the path variable, and that the
// following required fields are in request body: `id`, `title`,
// `content`, `author`, `publishDate`

router.put("/:id", (req, res) => {
  const requiredFields = ["id", "title", "content", "author", "publishDate"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${
      req.params.id
      }) and request body id ``(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post with id \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

// add endpoint for DELETE requests. These requests should
// have an id as a URL path variable and call
// `BlogPosts.delete()`

router.delete("/:id", (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post with id \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;
