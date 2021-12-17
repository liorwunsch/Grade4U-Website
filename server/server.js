let mysql = require('mysql');

const express = require('express');
const app = express();
const port = 8081;
app.use(express.json());

let con = mysql.createConnection({
    host: "remotemysql.com",
    user: "xRRgDKYU12",
    password: "6Fm51qF6UV",
    database: "xRRgDKYU12",
    insecureAuth: true
});

app.listen(port, () => {
    console.log(`GradesSystem app listening at http://localhost:${port}`);
});

/* ------------------------ database functions ------------------------ */

/* ----- Users Table ----- */

/* --- User --- */

app.post('/Login', (req, res) => {
    console.log("POST Login");
    console.log(req.body);
    if (req.body.title !== "Login") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    let query = "SELECT * FROM Users WHERE UserId = ? AND Password = ?";
    con.query(query, [req.body.UserId, req.body.Password], function (err, result) {
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        if (result.length === 0) { /* query returned nothing */
            res.status(400);
            res.send("UserId or Password incorrect");
        }
        else { /* send login details to client */
            const resMsg = {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        title: 'Login',
                        loginResult: 'OK',
                        UserId: result[0].UserId,
                        UserName: result[0].UserName,
                        Permission: result[0].Permission
                    })
            };
            res.type('application/json');
            res.send(resMsg);
        }
    });
});

app.post('/Register', (req, res) => {
    console.log("POST Register");
    console.log(req.body);
    if (req.body.title !== "Register") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }
    
    let query1 = "SELECT * FROM Users WHERE UserId = ?";
    con.query(query1, [req.body.UserId], function (err, result) {
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        if (result.length !== 0) { /* query returned something */
            res.status(400);
            res.send("UserId already exists");
        }
        else { /* add new user */
            var query = `INSERT INTO Users (UserId, UserName, Password, Permission) VALUES ('${req.body.UserId}', '${req.body.UserName}', '${req.body.Password}', '${req.body.Permission ? 1 : 0}')`;
            con.query(query, '', function (err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return;
                }
                if (result.length === 0) { /* query returned nothing */
                    res.status(400);
                    res.send("Registration not complete");
                }
                else {
                    const resMsg = {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                title: 'Register',
                                RegistrationResult: 'OK',
                            })
                    };
                    console.log(resMsg);
                    res.type('application/json');
                    res.send(resMsg);
                }
            });
        }
    });
});

/* ----- Courses Table ----- */

/* --- Lecturer --- */

app.post('/CreateCourse', (req, res) => {
    console.log("POST CreateCourse");
    console.log(req.body);
    if (req.body.title !== "CreateCourse") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    let query1 = "SELECT * FROM Courses WHERE CourseName = ?";
    con.query(query1, [req.body.CourseName], function (err, result) {
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        if (result.length !== 0) { /* query returned something */
            res.status(400);
            res.send("CourseName already exists");
        }
        else { /* add new course */
            var query = `INSERT INTO Courses (CourseName, LecturerId, Credits, Description) VALUES ('${req.body.CourseName}', '${req.body.LecturerId}', '${req.body.Credits}', '${req.body.Description}')`;
            con.query(query, '', function (err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return;
                }
                if (result.length === 0) { /* query returned nothing */
                    res.status(400);
                    res.send("Create Course not complete");
                }
                else {
                    const resMsg = {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                title: 'CreateCourse',
                                CreateCourseResult: 'OK',
                            })
                    };
                    console.log(resMsg);
                    res.type('application/json');
                    res.send(resMsg);
                }
            });
        }
    });
});

app.post('/GetLecturerCourses', (req, res) => {
    console.log("POST GetLecturerCourses");
    console.log(req.body);
    if (req.body.title !== "GetLecturerCourses") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    // returns courses list and number of students per course
    let query = "SELECT Courses.*, (SELECT COUNT(*) FROM CourseStudents WHERE CourseStudents.CourseName = Courses.CourseName) AS StudentsCount FROM Courses WHERE LecturerId = ?";
    con.query(query, [req.body.LecturerId], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/GetCourseStudents', (req, res) => {
    console.log("POST GetCourseStudents");
    console.log(req.body);
    if (req.body.title !== "GetCourseStudents") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    // returns students list and grade in course per student
    let query = "SELECT StudentId, Grade FROM CourseStudents WHERE CourseName = ?";
    con.query(query, [req.body.CourseName], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/SetGrade', (req, res) => {
    console.log("POST SetGrade");
    console.log(req.body);
    if (req.body.title !== "SetGrade") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    // updates student's grade in course
    let query = "UPDATE CourseStudents SET Grade = ? WHERE CourseName = ? AND StudentId = ?";
    con.query(query, [req.body.Grade, req.body.CourseName, req.body.StudentId], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

/* --- Student --- */

app.post('/GetCourses', (req, res) => {
    console.log("POST GetCourses");
    console.log(req.body);
    if (req.body.title !== "GetCourses") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    // returns courses list and lecturer name per course
    let query = "SELECT Courses.*, (SELECT UserName FROM Users WHERE Users.UserId = Courses.LecturerId) AS LecturerName FROM Courses";
    con.query(query, '', function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});

app.post('/Enroll', (req, res) => {
    console.log("POST Enroll");
    console.log(req.body);
    if (req.body.title !== "Enroll") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    let query1 = "SELECT * FROM CourseStudents WHERE CourseName = ? AND StudentId = ?";
    con.query(query1, [req.body.CourseName, req.body.StudentId], function (err, result) {
        if (err) {
            res.status(500);
            res.send(err);
            return;
        }
        if (result.length !== 0) { /* query returned something */
            res.status(400);
            res.send("Already enrolled to " + req.body.CourseName);
            console.log("Already enrolled to " + req.body.CourseName)
        }
        else { /* add student to course */
            var query = `INSERT INTO CourseStudents (CourseName, StudentId) VALUES ('${req.body.CourseName}', '${req.body.StudentId}')`;
            con.query(query, '', function (err, result) {
                if (err) {
                    res.status(500);
                    res.send(err);
                    return;
                }
                if (result.length === 0) { /* query returned nothing */
                    res.status(400);
                    res.send("Enroll not complete");
                    console.log("Enroll not complete")
                }
                else {
                    const resMsg = {
                        method: 'GET',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(
                            {
                                title: 'Enroll',
                                CreateCourseResult: 'OK',
                            })
                    };
                    console.log(resMsg);
                    res.type('application/json');
                    res.send(resMsg);
                }
            });
        }
    });
});

app.post('/GetStudentCourses', (req, res) => {
    console.log("POST GetStudentCourses");
    console.log(req.body);
    if (req.body.title !== "GetStudentCourses") {
        res.status(400);
        res.send("Something Went Wrong");
        return;
    }

    // returns courses list and grade per course
    let query = "SELECT CourseName, Grade, (SELECT Credits FROM Courses WHERE Courses.CourseName = CourseStudents.CourseName) AS Credits FROM CourseStudents WHERE StudentId = ?";
    con.query(query, [req.body.StudentId], function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
});
