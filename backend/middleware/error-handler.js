const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // this (customError object) is designed for thrown errors, but modified in case of Mongoose errors
  // if (err) {
  //   console.log(err.name);
  //   // console.log(err);
  //   // console.error(Object.values(err.errors).map(val => val.message));
  // }

  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong. Try again",
  }

  console.log(customError);

  // //if you have caught this error and have used throw new ThatSpecificError
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  //if the async error caught this error
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err }); //commenting, for better Mongoose error handling
  
  if(err.name === "ValidationError"){
    console.log("VE");
    customError.msg = Object.values(err.errors).map((item) => item.message).join(",");
    customError.statusCode = 400;
  }

  else if(err.name === "CastError"){
    console.log("CE");
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = 400;
  }
  
  if(err.code && err.code === 11000){
    console.log("DV");
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field. Has to be unique`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg }); //new handler for Mongoose errors
}

module.exports = errorHandlerMiddleware
