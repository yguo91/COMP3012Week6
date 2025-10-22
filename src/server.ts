import express from "express";
import path from "node:path";
import morgan from "morgan";
import { addTip, dislike, getTips, like, remove, authenticateUser } from "./data";
import session from "express-session";

const app = express();
const PORT = 3001;

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Add session middleware
app.use(session({
  secret: 'keyboard cat', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 //1 hour
  }
}));

app.get("/", (req, res) => {
  // TODO: 1) Add a conditional check to see if a user has a session & is logged in. If not, redirect to /login.
  //       2) If they do have a session, get their id from the session and use it to lookup their tips.
  //          You will probably want to modify the getTips function so it takes in a userId and returns the tips for that user
  if(!req.session.userId) {
    return res.redirect("/login");
  }
  const tips = getTips(req.session.userId);
  res.render("index", { tips });
});

app.get("/login", (req, res) => {
  // TODO: Replace this with an html form that has:
  //       1) An Email input
  //       2) A  Password input
  //       3) A Login Button
  if (req.session.userId) {
    return res.redirect("/");
  }
  
  // Render login page
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // TODO: 1) Check the database to see if you find a matching username + password
  //       2) If you find a match, create a session and redirect them to /tips
  //       3) If you do NOT find a match, redirect them to /login
  // Check the database for matching username + password
  const user = authenticateUser(username, password);
  
  if (user) {
    // Create session and redirect to home
    req.session.userId = user.id;
    res.redirect("/");
  } else {
    // No match found, redirect back to login
    res.redirect("/login");
  }
});

//additional route to handle logout
app.post("/logout", (req, res) => {
  // Destroy session and redirect to login
  req.session.destroy((err) => {
    res.redirect("/login");
  });
});

app.post("/tips", (req, res) => {
  const { text } = req.body;
  // Check if user is logged in
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  if (text) {
    addTip(req.session.userId, text);
  }
  res.redirect("/");
});

app.post("/tips/:id/like", (req, res) => {
  // Check if user is logged in
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  const likedTip = like(req.session.userId, id);
  res.redirect("/");
});

app.post("/tips/:id/dislike", (req, res) => {
  // Check if user is logged in
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  const dislikedTip = dislike(req.session.userId,id);
  res.redirect("/");
});

app.post("/tips/:id/delete", (req, res) => {
  // Check if user is logged in
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  const id = req.params.id;
  remove(req.session.userId, id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`
🚀 http://localhost:${PORT}`);
});
