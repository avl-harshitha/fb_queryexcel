# FB_QUERYEXCEL

Fast, optimal package to query data from firebase into a csv format for download using  [node](http://nodejs.org).

 
```js
var fbqueryexcel =  require('fb_queryexcel');
var firebase =  require('firebase');
const  express  =  require('express');
const  app  =  new  express();

var config =  {
 "databaseURL":  "https://yourdatabaseurl.firebaseio.com/",
 };

firebase.initializeApp(config);
var ref =  firebase.database().ref("urlstring");

app.get('/',  function  (req,  res)  {
 fbqueryexcel.convert(ref,attrib,seaparam,res);
})

```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install fb_queryexcel
```
## Features

  *  Query data from Firebase Database
  *  Data sent as a download attachment in CSV format (excel)
  * Validates search, query parameters
 
## Function Parameters
convert(ref, attrib, seaparam, response)

1.  ref => Firebase Database Reference
    
2.  attrib =>
    
    -   '*' => all attributes
    -   ['-',att1,att2,...] => all attributes except att1,att2 and so on
    -   [att1,att2,...] => attributes att1,att2 and so on are selected
3.  seaparam =>
    
    -   [[attrib,operator,limit1,limit2]]
    -   attrib is the name of the attribute for which condition is specified
    -   operator can be >,<,>=,<=,==,!=
    -   limit1 is the object to be compared with
    -   if operator is <>, then limit1> obj >limit2
4.  response =>
    
    -   response object generated by express framework

## Examples
```js
//example to get complete data as a csv(excel) file
app.get('/',  function  (req,  res)  {
 attrib =  '*'
 seaparam =  []
 fbqueryexcel.convert(ref,attrib,seaparam,res);
})
```
```js
//example to query data with few attributes removed and a constraint on one parameter(let's say num)
app.get('/',  function(req,  res)
{
 attrib =  ['-','phonenum','email']//we dont want phonenum and email attributes
 seaparam =  [['rank','<>',2,10]]
 fbqueryexcel.convert(ref,attrib,seaparam,res);
//returns objects with rank between 2 and 10 with phonenum and email attributes removed
})
```
```js
//example to query few attributes and constraints on 3 parameters

app.get('/',  function(req,  res)
{
 attrib =  ['name','rollno','rank','college']
 seaparam =  [['rank','>=',5],  ['college','==','ABC'],  ['name','!=','xyz']]
 fbqueryexcel.convert(ref,attrib,seaparam,res);
})
```



