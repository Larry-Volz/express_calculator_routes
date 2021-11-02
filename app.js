const process = require('process');
const express = require('express');
const math = require('mathjs');  //had to cache clean and npm reinstall express and mathjs for this
const { stringsToNums } = require('./helpers');
const ExpressError = require("./expressError");

let noNumsErrMsg = 'Query must be in the form of ?nums= followed by a comma-separated list of numbers.';

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    return res.send('use /mean or /median or /mode followed by ?nums= and then a comma-separated series of numbers in order to get the mean, median or mode of them');
})

app.get('/mean', function(req, res){
    if (!req.query.nums) {
        throw new ExpressError(noNumsErrMsg, 400)
      }
    let nums = req.query.nums.split(','); //comes in as one string - split into an array of strings
    let newNums = stringsToNums(nums); //makes into an array of numbers instead of  strings
    if (newNums instanceof Error) {
        throw new ExpressError(newNums.message, 400);
      }

    let mean = math.mean(newNums);

    return res.json({
        operation: "mean",
        value: mean
    });
})

app.get('/median', function(req, res){
    if (!req.query.nums) {
        throw new ExpressError(noNumsErrMsg, 400)
      }

    let nums = req.query.nums.split(','); //comes in as a string - split into an array of strings
    let newNums = stringsToNums(nums);
    if (newNums instanceof Error) {
        throw new ExpressError(newNums.message, 400);
      }

    let median = math.median(newNums);

    return res.json({operation: "median",
value: median});
})

app.get('/mode', function(req, res){
    if (!req.query.nums) {
        throw new ExpressError(noNumsErrMsg, 400)
      }

    let nums = req.query.nums.split(','); //comes in as a string - split into an array of strings
    let newNums = stringsToNums(nums);
    if (newNums instanceof Error) {
        throw new ExpressError(newNums.message,400);
      }

    let mode = math.mode(newNums);

    return res.json({operation: "mode",
value: mode});
})

app.get('/all', function(req, res){
    if (!req.query.nums) {
        throw new ExpressError(noNumsErrMsg, 400)
      }

    let nums = req.query.nums.split(','); //comes in as a string - split into an array of strings
    let newNums = stringsToNums(nums);
    if (newNums instanceof Error) {
        throw new ExpressError(newNums.message, 400);
      }
      
    let mode = math.mode(newNums);
    let median = math.median(newNums);
    let mean = math.mean(newNums);

    return res.json({
        operation: "all",
        mean: mean,
        median: median,
        mode: mode
});
})


/**************************** ERROR HANDLERS ************************************************ */

// 404 handler - only 3 arguments used if route isn't listed
app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found - Did you try looking under the couch?", 404);
    return next(notFoundError)
  });
  
  // generic error handler
  app.use(function(err, req, res, next) { //4 arguments tells express it is error handler
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });



app.listen(3000, () => {
    console.log('server started at port 3000'); })