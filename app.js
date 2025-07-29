const express=require('express');
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');


app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const router=require('./routersget');
const routerpost=require('./routerspost');
const routerdelete=require('./routerdelete');
const routerupdate=require('./routerupdate');
const routerreport=require('./routerreport');


app.use('/show',router); //master,address,attendance,education,all 

app.use('/add',routerpost); //master,address,attendance,education,all,profilepic

app.use('/delete',routerdelete);  //:id

app.use('/update',routerupdate);   //:id/file/attribute

app.use('/report',routerreport);   //master,address,attendance,education,all , week/:number,quarter/:number,month/:number

app.listen(3440,(err)=>{
    if(err){
        console.log("error while running server");
    }
      console.log("Server is running on port 3440");
    });



   