const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
// const {User} = require("../models/User");

// const stripeRoute = require("./routes/stripe");
const cors = require("cors");


dotenv.config();
mongoose.set('strictQuery', false); 

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);
app.get("/", (req, res)=>{
  res.send("index")
})
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

app.post("/api/checkout/payment", (req, res) =>{
  stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
  }, (stripeErr, stripeRes) =>{
      if(stripeErr){
          res.status(500).json(stripeErr)
      }
      else{
          res.status(200).json(stripeRes);
      }
  }
  )
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});