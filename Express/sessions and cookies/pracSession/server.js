import express from "express";
import session from "express-session";
import {connectDB} from "./Config/db.js"
import User from "./Models/User.js";
import bcrypt from "bcrypt";

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "MySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 5 * 60 * 1000,
      secure: false,
    //   sameSite: "lax",
    },
  })
);

app.get("/", (req, res) => {
  if (req.session.user) {
    res.send(`
            <h1>Welcom ${req.session.user}</h1> 
            <a href = "/logout">Logout</a>
        `);
  } else {
    res.send(`
            <h1>Login</h1>
            <form method="POST" action="/login">
                <input type="text" name="username" placeholder="username" required> <br>
                <input type="text" name="password" placeholder="password" required> <br>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Signup</a></p>
        `);
  }
});

app.get("/signup", (req, res) => {
  res.send(`
        <h1>SignUp</h1>
        <form method="POST" action="/signup">
            <input type="text" name="username" placeholder="username" required> <br>
            <input type="text" name="password" placeholder="password" required> <br>
            <button type="submit">SignUp</button>
        </form>    
        <a href="/">Back to Login</a>
    `);
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, hashedPassword });
    await user.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.send("Error User already Exists\n\n");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.send("User not found! <a href='/'>Try again</a>");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.send("Invalid password! <a href='/'>Try again</a>");
  }

  req.session.user = { username: user.username };
  res.redirect("/");
});

app.get("/check",async(req,res)=>{
    let name = req.session.user?req.session.user:"Guest";
    res.send(`Hello there ${name}`);
})
app.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Error logging out");
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
