const express=require('express');
const route=express.Router();
const fs=require('fs');
const path=require('path');
const { IncomingForm } = require('formidable');

const formidable=require('formidable');



route.get('/all', (req, res) => {
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


route.get('/address', (req, res) => {
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

route.get('/education', (req, res) => {
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

route.get('/attendance', (req, res) => {
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



   route.get('/week/:number', (req, res) => {
    const weekNumber = parseInt(req.params.number);
    if (isNaN(weekNumber) || weekNumber < 1) {
        return res.status(400).send("Invalid week number");
    }

    fs.readFile('student_attendanceinfo.json', 'utf-8', (err1, attendanceData) => {
        if (err1) {
            console.error("Error reading attendance file:", err1);
            return res.status(500).send("Error reading attendance");
        }

        fs.readFile('student_masterinfo.json', 'utf-8', (err2, masterData) => {
            if (err2) {
                console.error("Error reading master info file:", err2);
                return res.status(500).send("Error reading student info");
            }

            const attendance = JSON.parse(attendanceData);
            const master = JSON.parse(masterData);
            if (attendance.length === 0 || master.length === 0) return res.json([]);

            const dates = attendance.map(entry => new Date(entry.date));
            const minDate = new Date(Math.min(...dates));

            const startDate = new Date(minDate);
            startDate.setDate(startDate.getDate() + (weekNumber - 1) * 6);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 5); 

        
            const filtered = attendance.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= startDate && entryDate <= endDate;
            });

           
            const summary = {};
            filtered.forEach(entry => {
                const id = entry.student_id;
                const status = entry.status.toLowerCase();

                if (!summary[id]) {
                    summary[id] = {
                        student_id: id,
                        totalDays: 6,
                        Present: 0,
                        Absent: 0
                    };
                }

                if (status === 'present') summary[id].Present++;
                else if (status === 'absent') summary[id].Absent++;
            });

            const result = Object.values(summary).map(entry => {
                const student = master.find(s => s.student_id === entry.student_id);
                const percentage = ((entry.Present / entry.totalDays) * 100).toFixed(2);

                return {
                    student_id: entry.student_id,
                    student_name: student ? student.first_name : "Unknown",
                    totalDays: entry.totalDays,
                    Present: entry.Present,
                    Absent: entry.Absent,
                    percentage: parseFloat(percentage)
                };
            });

            res.json(result);
        });
    });
});   


route.get('/quarterly/:number', (req, res) => {
    const quarterNumber = parseInt(req.params.number);
    if (isNaN(quarterNumber) || quarterNumber < 1) {
        return res.status(400).send("Invalid quarter number");
    }

    // Read both files
    fs.readFile('student_attendanceinfo.json', 'utf-8', (err1, attendanceData) => {
        if (err1) {
            console.error("Error reading attendance file:", err1);
            return res.status(500).send("Error reading attendance");
        }

        fs.readFile('student_masterinfo.json', 'utf-8', (err2, masterData) => {
            if (err2) {
                console.error("Error reading master info file:", err2);
                return res.status(500).send("Error reading student info");
            }

            const attendance = JSON.parse(attendanceData);
            const master = JSON.parse(masterData);
            if (attendance.length === 0 || master.length === 0) return res.json([]);

            // Get first date
            const dates = attendance.map(entry => new Date(entry.date));
            const minDate = new Date(Math.min(...dates));

            const startDate = new Date(minDate);
            startDate.setDate(startDate.getDate() + (quarterNumber - 1) * 120);

            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 119); // 120-day range

            // Filter entries within quarter
            const filtered = attendance.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= startDate && entryDate <= endDate;
            });

            // Create summary map
            const summary = {};
            filtered.forEach(entry => {
                const id = entry.student_id;
                const status = entry.status.toLowerCase();

                if (!summary[id]) {
                    summary[id] = {
                        student_id: id,
                        totalDays: 120,
                        presentCount: 0,
                        absentCount: 0
                    };
                }

                if (status === 'present') summary[id].presentCount++;
                else if (status === 'absent') summary[id].absentCount++;
            });

            // Merge with names and add percentage
            const result = Object.values(summary).map(entry => {
                const student = master.find(s => s.student_id === entry.student_id);
                const percentage = ((entry.presentCount / entry.totalDays) * 100).toFixed(2);

                return {
                    student_id: entry.student_id,
                    student_name: student ? student.student_name : "Unknown",
                    totalDays: entry.totalDays,
                    presentCount: entry.presentCount,
                    absentCount: entry.absentCount,
                    percentage: parseFloat(percentage)
                };
            });

            res.json(result);
        });
    });
});

route.get('/year/:number', (req, res) => {
    const yearNumber = parseInt(req.params.number);
    if (yearNumber < 1) {
        return res.status(400).send("Invalid year number");
    }

    fs.readFile('student_attendanceinfo.json', 'utf-8', (err1, attendanceData) => {
        if (err1) {
            console.error("Error reading attendance file:", err1);
            return res.status(500).send("Error reading attendance");
        }

        fs.readFile('student_masterinfo.json', 'utf-8', (err2, masterData) => {
            if (err2) {
                console.error("Error reading master info file:", err2);
                return res.status(500).send("Error reading student info");
            }

            const attendance = JSON.parse(attendanceData);
            const master = JSON.parse(masterData);
            if (attendance.length === 0 || master.length === 0) return res.json([]);

            
            const dates = attendance.map(entry => new Date(entry.date));
            const minDate = new Date(Math.min(...dates));

            const startDate = new Date(minDate);
            startDate.setDate(startDate.getDate() + (yearNumber - 1) * 365);

            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 364); 

            const filtered = attendance.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= startDate && entryDate <= endDate;
            });

      
            const summary = {};
            filtered.forEach(entry => {
                const id = entry.student_id;
                const status = entry.status.toLowerCase();

                if (!summary[id]) {
                    summary[id] = {
                        student_id: id,
                        totalDays: 365,
                        presentCount: 0,
                        absentCount: 0
                    };
                }

                if (status === 'present') summary[id].presentCount++;
                else if (status === 'absent') summary[id].absentCount++;
            });

       
            const result = Object.values(summary).map(entry => {
                const student = master.find(s => s.student_id === entry.student_id);
                const percentage = ((entry.presentCount / entry.totalDays) * 100).toFixed(2);

                return {
                    student_id: entry.student_id,
                    student_name: student ? student.student_name : "Unknown",
                    totalDays: entry.totalDays,
                    Present: entry.presentCount,
                    Absent: entry.absentCount,
                    Percentage: parseFloat(percentage)
                };
            });

            res.json(result);
        });
    });
});





module.exports=route;