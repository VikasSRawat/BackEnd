import express from "express";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Session setup with custom session ID
app.use(session({
  secret: "my-secret-key",
  resave: false,
  saveUninitialized: true,
  genid: function (req) {
    // Custom session ID format
    return "custom_" + uuidv4();
  },
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes
    secure: false // change to true when using HTTPS
  }
}));

// Home page
app.get("/", (req, res) => {
  res.send(`
    <h1>Custom Session ID Example</h1>
    <p>Current Session ID: ${req.sessionID}</p>
    <form method="POST" action="/setname">
      <input type="text" name="username" placeholder="Enter your name" required>
      <button type="submit">Save Name in Session</button>
    </form>
    <br>
    <a href="/getname">Get Name from Session</a>
  `);
});

// Store username in session
app.post("/setname", (req, res) => {
  req.session.username = req.body.username;
  res.send(`
    <p>Name saved in session!</p>
    <a href="/">Go Back</a>
  `);
});

// Retrieve username from session
app.get("/getname", (req, res) => {
  if (req.session.username) {
    res.send(`
      <p>Stored name: ${req.session.username}</p>
      <a href="/">Go Back</a>
    `);
  } else {
    res.send(`
      <p>No name found in session!</p>
      <a href="/">Go Back</a>
    `);
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
