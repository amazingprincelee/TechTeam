//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const saltRounds = 10;







const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.connect("mongodb+srv://amazingprincelee:test-123@amazingprincelee.8jaol8g.mongodb.net/techDB");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


const postSchema = new mongoose.Schema({
  title: String,
  content: String
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});





const Post = mongoose.model("post", postSchema);
const User = mongoose.model("user", userSchema);






app.get("/", function(req, res){

  Post.find({}, function(err, foundItem){
   
    res.render("home", {homeContent: homeStartingContent, posts: foundItem });
  });

  
});

app.get("/about", function(req, res){
  res.render("about.ejs", {aboutContent: aboutContent });
});

app.get("/contact", function(req, res){
  res.render("contact.ejs", {contactContent: contactContent });
});


app.get("/login", function(req,res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});
app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });


app.post("/compose", function(req, res){
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;

  const postContent = new Post ({
    title: postTitle,
    content: postBody

  });

  postContent.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
  
  

});

app.post("/register", function(req, res){

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    const user = new User({

      email: req.body.email,
      password: hash
  
    });
  
    user.save(function(err){
      if(err){
        console.log(err)
      }else{
        res.redirect("login");
        
      }
    });
});

  


});

app.post("/login", function(req, res){
 
  User.findOne({email: req.body.email}, function(err, foundUser){

   if(err){
    console.log(err);
   }else{
    if(foundUser){
      bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
        if(result === true){
          res.render("compose");
        }
    });
    }else{
      res.send("User not found");
    }
   }


  })

});




















let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("Server running on port 3000");
});