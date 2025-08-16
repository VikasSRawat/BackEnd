import express, { urlencoded } from 'express';
import session from 'express-session';
import bcrypt from 'bcrypt';
import User from './models/USER.js';
import { connectDB } from './config/db.js';


connectDB();

const app = express();

app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:"mykey",
    resave:"false",
    saveuninitialized:true,
    cookie:{
        maxAge:5*60*1000,
        secure:false
    }
}));


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
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    `);
  }
});

app.get("/signup", (req, res) => {
  res.send(`
    <h1>Signup</h1>
    <form method="POST" action="/signup">
      <input type="text" name="username" placeholder="Username" required><br>
      <input type="password" name="password" placeholder="Password" required><br>
      <button type="submit">Signup</button>
    </form>
    <a href="/">Back to Login</a>
  `);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.redirect("/");
  } catch (err) {
    res.send("User already exists or error occurred!");
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

// Logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.send("Error logging out");
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});

// Start Server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));