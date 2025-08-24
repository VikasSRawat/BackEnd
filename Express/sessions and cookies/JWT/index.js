import express from "express";
import jwt from "jsonwebtoken";
import bodyparser from "body-parser";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());

const JWT_SECRET = "secretkey";

const users = [
  {
    id: 1,
    username: "vikas",
    password: "12345",
  },
  {
    id: 2,
    username: "alice",
    password: "password",
  },
];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) 
        return res.sendStatus(403);
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
