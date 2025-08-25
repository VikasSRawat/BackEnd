import express from "express";
import jwt from "jsonwebtoken";
import bodyparser from 'body-parser';

const app = express();

app.use(bodyparser.json())
app.use(express.urlencoded({ extended: true }));


const JWT_SECRET = "MySecretKey"; //* This is used to sign the JWT token to encrypt it and decrypt it

//* Temporary Database for user authentication
const users = [
  { id: 1, username: "user1", password: "123" },
  { id: 2, username: "user2", password: "123" },
  { id: 3, username: "user3", password: "123" },
];

app.post("/login", (res, req) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //* After the user is successfully authenticated the server is generating the token with the
  //* user's creds and being signed with the secret key, it also is saying when the token will expire
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  //* Sending the token back to the user
  res.json({ token });
});

function authenticateToken(res, req, next) {
  const authHeader = req.authHeader["authorization"];
  const token = authHeader.split(" ")[1];

  //* If there is no token, then send back an error status
  if (!token) {
    res.sendStatus(401);
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}, this is your dashboard.`,
  });
});

app.listen(3000, () => {
  console.log(`Listening at http://localhost:3000`);
});
