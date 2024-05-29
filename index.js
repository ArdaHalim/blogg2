import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static('public'));

let blogPosts = [];
let editIndex = null;

// Route för att visa startsidan med alla inlägg
app.get("/", (req, res) => {
  res.render("index", { blogPosts: blogPosts, editIndex: editIndex, postToEdit: blogPosts[editIndex] });
});

// Route för att lägga till ett nytt inlägg
app.post("/", (req, res) => {
  const blogText = req.body.blogtext;
  blogPosts.push(blogText);
  res.redirect("/");
});

// Route för att redigera ett inlägg (visa redigeringsformulär)
app.get("/edit/:index", (req, res) => {
  editIndex = req.params.index;
  res.redirect("/");
});

// Route för att hantera redigering av ett inlägg
app.post("/edit/:index", (req, res) => {
  const index = req.params.index;
  const editedPost = req.body.editedPost;
  blogPosts[index] = editedPost;
  editIndex = null;
  res.redirect("/");
});

// Route för att radera ett inlägg
app.post("/delete", (req, res) => {
  const index = req.body.index;
  blogPosts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Servern körs på port ${port}");
});