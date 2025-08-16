import express from "express";
import session from "express-session";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Mykey",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000,
      secure: false,
    },
  })
);

const USER = {
  username: "admin",
  password: "1234",
};

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`
      <h1>Welcome, ${req.session.user.username}!</h1>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>Login</h1>
      <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required><br>
        <input type="password" name="password" placeholder="Password" required><br>
        <button type="submit">Login</button>
      </form>
    `);
  }
});


app.post("/login",(req,res)=>{
    const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    req.session.user = { username };
    res.redirect("/");
  } else {
    res.send(`
      <p>Invalid username or password!</p>
      <a href="/">Try Again</a>
    `);
  }
})


app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("Error logging out");
    }
    res.clearCookie("connect.sid"); // clear cookie
    res.redirect("/");
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});