require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// // connectDB
// const connectDB = require("./db/connect");

// // middleware-import
// // functional
// const authUser = require("./middleware/authentication");
// // security
// const helmet = require("helmet");
// const cors = require("cors");
// const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");
// const cookieParser = require('cookie-parser');

// routes
// const authRouter = require("./routes/auth");
const restaurantsRouter = require("./routes/restaurants");

// // error handler
// const notFoundMiddleware = require('./middleware/not-found');
// const errorHandlerMiddleware = require('./middleware/error-handler');

// // middleware-use
// app.use(cors({
//   origin: 'http://127.0.0.1:5000', //this is the url of the frontend, this and only this can send requests
//   credentials: true
//   })); //has to be at the top, of all these, doesn't work otherwise
// app.set("trust proxy", 1);  //for reverse proxy servers like Nginx
// app.use(rateLimiter({
//   windowMs: 15 * 60 * 1000, //15 mins
//   max: 1000, //1000 reqs during ths windowMs
// }));
app.use(express.json());  //to be able to read JSON in req.body
// app.use(helmet());
// app.use(xss());
// app.use(express.static('public'));
// app.use(cookieParser());

// routes
// app.use("/api/v1/auth", authRouter);
app.use("/api/v1/restaurants", restaurantsRouter); //, authUser between the two

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
