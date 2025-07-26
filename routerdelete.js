const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');


let completed = 0;
    const deletedFrom = [];

route.delete('/remove/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const files = [
        'student_masterinfo.json',
        'student_attendanceinfo.json',
        'student_educationinfo.json',
        'student_addressinfo.json'
    ];

    let c = 0;
    const deleted = [];

    files.forEach((file) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.log(`Error reading ${file}`);
                c++;
                if (c === files.length) {
                    return res.send({ message: "Operation completed with errors", deleted });
                }
                return;
            }

            const jsonData = JSON.parse(data);
            const index = jsonData.findIndex(user => user.student_id === id);
            console.log(`File: ${file}, Index: ${index}`);

            if (index !== -1) {
                const deleted = jsonData.splice(index, 1);
                deletedFrom.push({ file, deleted });

                fs.writeFile(file, JSON.stringify(jsonData, null, 2), (err) => {
                    if (err) {
                        console.log(`Error writing ${file}`);
                    }
                    c++;
                    if (c === files.length) {
                        return res.send({
                            message: `Deleted student with id ${id} from available files.`,
                            deleted
                        });
                    }
                });
            } else {
                c++;
                if (c === files.length) {
                    return res.send({
                        message: `Student ID ${id} not found in one or more files.`,
                        deleted
                    });
                }
            }
        });
    });
});

module.exports=route;