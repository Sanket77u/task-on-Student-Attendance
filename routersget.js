const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');




route.get('/studentinfo',(req,res)=>{
    fs.readFile('student_masterinfo.json','utf-8',(err,data)=>{
        if(err){
            res.send("error while showing no data found");
        }
        const m=JSON.parse(data)
        res.json(m);
        console.log(m);
        res.send();
    })
})

route.get('/addressinfo',(req,res)=>{
    fs.readFile('student_addressinfo.json','utf-8',(err,data)=>{
        if(err){
            res.send("error while showing no data found");
        }
        const m=JSON.parse(data)
        res.json(m);
        console.log(m);
        res.send();
    })
})

route.get('/educationinfo',(req,res)=>{
    fs.readFile('student_educationinfo.json','utf-8',(err,data)=>{
        if(err){
            res.send("error while showing no data found");
        }
        const m=JSON.parse(data)
        res.json(m);
        console.log(m);
        res.send();
    })
})

route.get('/attendanceinfo',(req,res)=>{
    fs.readFile('student_attendanceinfo.json','utf-8',(err,data)=>{
        if(err){
            res.send("error while showing no data found");
        }
        const m=JSON.parse(data)
        res.json(m);
        console.log(m);
        res.send();
    })
})


// all student infooo 
route.get('/allstudentsinfo', (req, res) => {
   
    let masterData = [];
    let addressData = [];
    let educationData = [];
    let attendanceData = [];

    fs.readFile('student_masterinfo.json', 'utf-8', (err, data) => {
        if (err) return res.send("Error reading master info");

        masterData = JSON.parse(master);

        fs.readFile('student_addressinfo.json', 'utf-8', (err, address) => {
            if (err) return res.send("Error reading address info");

            addressData = JSON.parse(address);

            fs.readFile('student_educationinfo.json', 'utf-8', (err, education) => {
                if (err) return res.send("Error reading education info");

                educationData = JSON.parse(education);

                fs.readFile('student_attendanceinfo.json', 'utf-8', (err, attendance) => {
                    if (err) return res.send("Error reading attendance info");

                    attendanceData = JSON.parse(attendance);

                    const merged = masterData.map((student) => {
                        return {
                            master: student,
                            address: addressData.find(a => a.student_id === student.student_id),
                            education: educationData.find(e => e.student_id === student.student_id),
                            attendance: attendanceData.find(at => at.student_id === student.student_id),
                        };
                    });

                    res.json(merged); 
                });
            });
        });
    });
});


module.exports=route;