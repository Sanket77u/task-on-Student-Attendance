const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');



route.get('/report', (req, res) => {
    fs.readFile('student_attendanceinfo.json', 'utf-8', (err, attendanceData) => {
        if (err) {
            console.log("Error reading attendance file");
            return res.status(500).send("Error reading attendance");
        }

        fs.readFile('student_masterinfo.json', 'utf-8', (err, studentData) => {
            if (err) {
                console.log("Error reading student master file");
                return res.status(500).send("Error reading student data");
            }

            let attendance = JSON.parse(attendanceData);
            let students = JSON.parse(studentData);

            const student = {};
            students.forEach(s => {
                student[s.student_id] = s.first_name;
            });

          
            const combined = attendance.map(a => ({name: student[a.student_id] || "no name", ...a}));
console.log(combined);
            res.send(combined);
        });
    });
});


route.get('/addressreport', (req, res) => {
    fs.readFile('student_addressinfo.json', 'utf-8', (err, attendanceData) => {
        if (err) {
            console.log("Error reading attendance file");
            return res.status(500).send("Error reading attendance");
        }

        fs.readFile('student_masterinfo.json', 'utf-8', (err, studentData) => {
            if (err) {
                console.log("Error reading student master file");
                return res.status(500).send("Error reading student data");
            }

            let attendance = JSON.parse(attendanceData);
            let students = JSON.parse(studentData);

            const student = {};
            students.forEach(s => {
                student[s.student_id] = s.first_name;
            });

          
            const combined = attendance.map(a => ({ ...a, name: student[a.student_id] || "no name"}));
console.log(combined);
            res.send(combined);
        });
    });
});

route.get('/educationreport', (req, res) => {
    fs.readFile('student_educationinfo.json', 'utf-8', (err, attendanceData) => {
        if (err) {
            console.log("Error reading attendance file");
            return res.status(500).send("Error reading attendance");
        }

        fs.readFile('student_masterinfo.json', 'utf-8', (err, studentData) => {
            if (err) {
                console.log("Error reading student master file");
                return res.status(500).send("Error reading student data");
            }

            let attendance = JSON.parse(attendanceData);
            let students = JSON.parse(studentData);

            const student = {};
            students.forEach(s => {
                student[s.student_id] = s.first_name;
            });

          
            const combined = attendance.map(a => ({ ...a, name: student[a.student_id] || "no name"}));
console.log(combined);
            res.send(combined);
        });
    });
});


// route.get('/attendancereport', (req, res) => {
//     fs.readFile('student_attendanceinfo.json', 'utf-8', (err, attendanceData) => {
//         if (err) {
//             console.log(" Error reading attendance file");
//             return res.status(500).send("Error reading attendance");
//         }

//         fs.readFile('student_masterinfo.json', 'utf-8', (err, studentData) => {
//             if (err) {
//                 console.log(" Error reading student master file");
//                 return res.status(500).send("Error reading student data");
//             }

//             const attendance = JSON.parse(attendanceData);
//             const students = JSON.parse(studentData);

//             const student = {};
//             students.forEach(s => {
//                 student[s.student_id] = s.first_name || s.name || "Unknown";
//             });

         
//             const reportmap= {};

//             attendance.forEach(entry => {
//                 const id = entry.student_id;
//                 const status = entry.status;
//                 const date=entry.date;

//                 if (!reportmap[id]) {
//                     reportmap[id] = {
//                         student_id: id,
                       
//                         name: student[id] || "No Name",
//                         total_days: 0,
//                         present: 0,
//                         absent: 0
//                     };
//                 }

//                 reportmap[id].total_days += 1;
//                 if (status.toLowerCase() === "present") {
//                     reportmap[id].present += 1;
//                 } else if (status.toLowerCase() === "absent") {
//                     reportmap[id].absent += 1;
//                 }
//                   const total = reportmap[id].total_days;
//     const present = reportmap[id].present;
//     reportmap[id].percentage = ((present / total) * 100).toFixed(2) + "%";
//             });

//             const report = Object.values(reportmap);
//             console.log(" Final Report:", report);
//             res.send(report);
//         });
//     });
// });

route.get('/attendancereport', (req, res) => {
  fs.readFile('student_attendanceinfo.json', 'utf-8', (err, attendanceData) => {
    if (err) {
      console.log(" Error reading attendance file");
      return res.status(500).send("Error reading attendance");
    }

    fs.readFile('student_masterinfo.json', 'utf-8', (err, studentData) => {
      if (err) {
        console.log(" Error reading student master file");
        return res.status(500).send("Error reading student data");
      }

      const attendance = JSON.parse(attendanceData);
      const students = JSON.parse(studentData);

      const student = {};
      students.forEach(s => {
        student[s.student_id] = s.first_name || s.name || "Unknown";
      });

      const reportmap = {};

      attendance.forEach(entry => {
        const id = entry.student_id;
        const status = entry.status;

        if (!reportmap[id]) {
          reportmap[id] = {
            student_id: id,
            name: student[id] || "No Name",
            total_days: 0,
            present: 0,
            absent: 0,
            percentage: "0%"
          };
        }

        reportmap[id].total_days += 1;

        if (typeof status === 'string') {
          if (status.toLowerCase() === "present") {
            reportmap[id].present += 1;
          } else if (status.toLowerCase() === "absent") {
            reportmap[id].absent += 1;
          }
        } else {
          console.warn(` Missing or invalid status for entry`, entry);
        }

        const total = reportmap[id].total_days;
        const present = reportmap[id].present;
        reportmap[id].percentage = ((present / total) * 100).toFixed(2) + "%";
      });

      const report = Object.values(reportmap);
      console.log(" Final Report:", report);
      res.send(report);
    });
  });
});




module.exports=route;