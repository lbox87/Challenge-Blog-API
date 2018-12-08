// note to self (nts): always include express framework to receive the request and response objects
const express = require("express");
// initialize middlewar "morgan" for console logging
const morgan = require("morgan");

// ------ask------ you need to import `blogPostsRouter` router and route
const bprouter = require("./blogPostsRouter");

const app = express();

app.use(morgan("common"));
app.use(express.json());
// ------ask------



// requests to HTTP requests to `/blog-posts` to `blogPostsRouter`
app.use('/blog-posts', bprouter);

// ------ask------
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
