const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');
const { ReadableStreamBYOBRequest } = require('stream/web');








route.patch('/:id/:file/:attribute', (req, res) => {
    const id = parseInt(req.params.id);
    const file = req.params.file;
    const attribute = req.params.attribute;
    const newValue = req.body.value;

    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading file");
            return ressend("File read error");
        }

        let jsonData;
      
            jsonData = JSON.parse(data);
     

       
        const index = jsonData.findIndex(user => user.student_id === id);
        if (index === -1) {
            return res.status(404).send(`Item with id=${id} not found`);
        }

        if (!(attribute in jsonData[index])) {
            return res.send(`Attribute '${attribute}' not found in object`);
        }

        jsonData[index][attribute] = newValue;

        fs.writeFile(file, JSON.stringify(jsonData, null, 2), err => {
            if (err) {
                console.error("Error writing to file");
                return res.status(500).send("File write error");
            }

            res.send(`Updated ${attribute} of id=${id} to ${newValue}`);
        });
    });
});


module.exports=route;