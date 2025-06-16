import express from "express";
import path from "path";

const staticPath = path.join(import.meta.dirname, "public");
const app = express();

app.use("/public", express.static(staticPath));
app.get("/", (req, res) => {
  res.end("Hi");
});

//! Route Parameters
app.get("/profile/:username", (req, res) => {
  //* The colon is only there to signify that this is the dynamic parameter and is actually not present in the URL
  //*  Without the colon, Express treats it as a fixed word.
  //* /user/id — matches only if the URL is exactly /user/id
  //* /user/:id — matches /user/anything
  console.log(req.params);
  res.end(`<h1>My username is ${req.params.username}</h1>`);
});

//* Note: The get should be exactly the same as the URL, if there are segments that don't match or missing/added then that route won't be called

//* For Multiple parameters
app.get("/profile/:username/article/:slug", (req, res) => {
  console.log(req.params);
  res.end(
    `<h1>The username is ${req.params.username} and the slug is ${req.params.slug}</h1>`
  );
});

//* Note if the path contains spaces, then the url will automatically fill it with % symbol and here it will show the space normally

//! Query Parameters
app.get("/product", (req, res) => {
  //* If the query parameters are product?search=milk&limit=200
  console.log(req.query);
  console.log(req.query["search"]); //* Milk
  console.log(req.query.limit); //* 200
  console.log(req.query["lol"]); //* undefined as there is no query paramter with key as lol
//?   res.end(`<h1>Product</h1>`);
  try {
    if (Object.keys(req.query).length > 0) //* In this way we can check if there are any query parameters present
      res.end(`<h1>Product Page</h1><p>User has searched for ${req.query.search}</p>`);
  } catch (err) {
    res.end(`<h1>Product Page</h1>`); 
    console.error("Error message has come ", err);
  }
});

app.listen(3000, () => {
  console.log("Listening");
});
