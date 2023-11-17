// const mongoose = require('mongoose')

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
// }

// module.exports = connectDB

const {Pool} = require("pg");
const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "127.0.0.1",
  database: process.env.PGDATABASE || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  port: process.env.PGPORT || 5432,
});
module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
};