'use strict'

// C library API
const ffi = require('ffi-napi');

// Express App (Routes)
const express = require("express");
const app     = express();
const path    = require("path");
const fileUpload = require('express-fileupload');

app.use(fileUpload());
app.use(express.static(path.join(__dirname+'/uploads')));

// Minimization
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Important, pass in port as in `npm run dev 1234`, do not change
const portNum = process.argv[2];

// Send HTML at root, do not change
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Send Style, do not change
app.get('/style.css',function(req,res){
  //Feel free to change the contents of style.css to prettify your Web app
  res.sendFile(path.join(__dirname+'/public/style.css'));
});

// Send obfuscated JS, do not change
app.get('/index.js',function(req,res){
  fs.readFile(path.join(__dirname+'/public/index.js'), 'utf8', function(err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

//Respond to POST requests that upload files to uploads/ directory
app.post('/upload', function(req, res) {
  if(!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadFile = req.files.uploadFile;

  // Use the mv() method to place the file somewhere on your server
  uploadFile.mv('uploads/' + uploadFile.name, function(err) {
    if(err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
  });
});

//Respond to GET requests for files in the uploads/ directory
app.get('/uploads/:name', function(req , res){
  fs.stat('uploads/' + req.params.name, function(err, stat) {
    if(err == null) {
      res.sendFile(path.join(__dirname+'/uploads/' + req.params.name));
    } else {
      console.log('Error in file downloading route: '+err);
      res.send('');
    }
  });
});

//******************** Your code goes here ********************/

let sharedLib = ffi.Library('./libsvgparser', {
  'validFile' : [ 'bool', [ 'string' ] ],
  'getNumber' : [ 'int', [ 'string', 'string' ] ]
});

app.get('/fileInfo', function(req , res){ // get all the file information

  let files = [];
  let data = [];
  let i = 0;

  // 1. get all valid files, place in an array
  fs.readdirSync('./uploads').forEach(file => {
      let extension = file.split('.').pop();
      let filename = "uploads/" + file;
      if ((extension == 'svg') && (sharedLib.validFile(filename) == true)){ // if the file is valid
          files[i] = filename;
          ++i;
      }
      else{
          console.log(filename + " not a valid svg file and not added to the file log panel");
      }
  });

  // 2. get all the information we need
  let size = 0;
  while (size < i){

    // a. get the numbers
    let image = {};

    image.fileName = files[size];
    let currFile = fs.statSync(files[size]);
    image.fileSize = (Math.round((currFile.size) / 1024)); // size in kilobytes
    image.numRects = sharedLib.getNumber("rect", files[size]);
    image.numCircs = sharedLib.getNumber("circ", files[size]);
    image.numPaths = sharedLib.getNumber("path", files[size]);
    image.numGroups = sharedLib.getNumber("group", files[size]);

    // b. for each shape, get all info
/*
    image.title = ;
    image.decsription = ;
    image.rectangles = [];
    image.rectangles = [];
    image.rectangles = [];
    image.rectangles = [];
*/
    // d. lastly, push into the data array
    data.push(image);
    ++size;
  }

  // 2. send the valid files
  res.send( // this will send the error return values
    {
      info: data
    }
  );

});

/*
app.get('/endpointAttr', function(req , res){ // add or edit attribute functionality

  // req is an object of string values corresponding for arguments
  let retStr = req.query.data1 + " " + req.query.data2;
  res.send( // this will send the error return values
    {
      somethingElse: retStr
    }
  );

});
*/

app.listen(portNum);
console.log('Running app at localhost: ' + portNum);