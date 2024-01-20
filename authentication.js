import express from "express";
import bodyparser from "body-parser";
import ejs from "ejs";
import { connect, Schema, model } from "mongoose";
import md5 from "md5";
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: true }));


connect("mongodb://127.0.0.1:27017/userDB");
// mongoose.set("useCreateIndex", true);

const userSchema = new Schema({
    email: String,
    password: String,
});

const User = new model("User", userSchema);


app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs")

});

app.get("/register", (req, res) => {
  res.render("register.ejs")
})

app.post("/register", async (req, res) => {

    const newUser = new User ({
        email: req.body.username,
        password: md5 (req.body.password)
    });

    User.findOne({email: req.body.username})
    .then (function(foundUser) {
      if (foundUser) {
        res.send("Email already exists. Try logging in")
      } else {
        res.render("secrets.ejs");
        newUser.save()
      }
      
    })
    .catch(function(err) {
      console.log(err);
    })
});

app.post("/login", async (req, res) => {
  const newUser = new User ({
        email: req.body.username,
        password: md5 (req.body.password)
  });

  User.findOne({email: req.body.username})
    .then (function(foundUser) {
      if (foundUser) {
        if (foundUser.password === md5(req.body.password)) {
          res.render("secrets.ejs")
        } else {
          res.send("Password incorrect")
        }
      } else {
        res.send("Email id doesn't exist. Please register first.");
      }
      
    })
    .catch(function(err) {
      console.log(err);
    })
    
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
