const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser")

const URL = require("./models/urlModel");

const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/urlRouter");
const userRoute = require("./routes/userRouter")
const {isLoggedIn,checkAuth} = require("./middlewares/auth")
const { connectToDB } = require("./connect");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use("/url",isLoggedIn, urlRoute);
app.use("/", checkAuth,staticRoute);
app.use("/user",userRoute)

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

connectToDB("mongodb://localhost:27017/url-Shortner")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Url Shortener");
});

app.get("/signup",(req,res)=>{
  res.render("signup")
})

app.get("/login",(req,res)=>{
  res.render("login")
})

app.get("/urls/:shortid", async (req, res) => {
  const shortUrl = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    { shortUrl },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(3000, () => {
  console.log("Server running on -> http://localhost:3000");
});
