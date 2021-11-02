const process = require('process');
const express = require('express');
const math = require('mathjs');
const { stringsToNums } = require('./helpers');

app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req,res){
    return res.send('use /mean or /median or /mode followed by ?nums= and then a comma-separated series of numbers in order to get the mean, median or mode of them');
})

app.get('/mean', function(req, res){

    let nums = req.query.nums.split(','); //comes in as a string - split into an array of strings
    let newNums = stringsToNums(nums);
    let mean = math.mean(newNums);

    return res.json({operation: "mean",
value: mean});
})

app.get('/median', function(req, res){

    let nums = req.query.nums.split(','); //comes in as a string - split into an array of strings
    let newNums = stringsToNums(nums);
    let median = math.median(newNums);

    return res.json({operation: "median",
value: median});
})

app.get('/mode', function(req, res){

    let nums = req.query.nums.split(','); //comes in as a string - split into an array of strings
    let newNums = stringsToNums(nums);
    let mode = math.mode(newNums);

    return res.json({operation: "mode",
value: mode});
})

app.listen(3000, () => {
    console.log('server started at port 3000'); })