// const sqlite3 = require("sqlite3");
// const express = require("express");
// const app = express();
// const port = 8080;
// app.listen(port,()=>{
//     console.log("Server is running on port 8080");
// });
// const db = new sqlite3.Database('./emp_database.db',(err)=>{
//     if(err){
//         console.error("Error in opening database "+ err.message);
//     }else{
//         db.run('CREATE TABLE employees (\
//             employee_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
//             last_name NVARCHAR(20) NOT NULL, \
//             first_name NVARCHAR(20) NOT NULL, \
//             title NVARCHAR(20),\
//             address NVARCHAR (100),\
//             country_code INTEGER\
//             )',(err)=>{
//                 if(err){
//                     console.log("Table already exists");
//                 }
//                 let insert = 'INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)';
//                 db.run(insert,["Verma","Chanchal","SDE-1","Indore",1]);
//             });
//     }
// })

// //GET : by id
// app.get('/employees/:id',(req,res,next)=>{
//     var params = [req.params.id];
//     db.get("SELECT * FROM employees where employee_id=?",[req.pramas.id], (err,row)=>{
//         if(err){
//             res.status(400).json({"error":err.message})
//             return ;
//         }
//         res.status(200).json(row);
//     });
// });

// //GET : all
// app.get('/employees',(req,res,next)=>{
//     var params = [req.params.id];
//     db.all("SELECT * FROM employees",[],(err,rows)=>{
//         if(err){
//             res.status(400).json({"error":err.message})
//             return ;
//         }
//         res.status(200).json({rows})
//     });
// });

// //POST :add
// // app.post('/employees',(req,res,next)=>{
// //     var reqBody = req.body;
// //     db.run(`INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)`,[reqBody.last_name,reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code],function(err,result){
// //         if(err){
// //             res.status(400).json({"error":err.message})
// //             return;
// //         }
// //         res.status(201).json({"employee_id":this.lastID})
// //     });
// // });
// app.post("/employees/", (req, res, next) => {
//     var reqBody = req.body;
//     db.run("INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)",
//         [reqBody.last_name, reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code],
//         function (err, result) {
//             if (err) {
//                 res.status(400).json({ "error": err.message })
//                 return;
//             }
//             res.status(201).json({
//                 "employee_id": this.lastID
//             })
//         });
// });

// //PUT : update

// app.patch('/employees',(req,res,next)=>{
//     var reqBody = req.body;
//     db.run(`UPDATE employees set last_name=?, first_name=?, title=?,address=?,country_code=? WHERE employee_id=?`,[reqBody.last_name,reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code, reqBody.employee_id], function(err,result){
//     if(err){
//         res.status(400).json({"error":res.message})
//         return;
//     }
//     res.status(200).json({updatedID:this.changes})
//     });
// });

// //DELETE : delete
// app.delete('/employees/:id',(req,res,next)=>{
//     db.run(`DELETE FROM user WHERE id=?`,req.params.id, function(err,result){
//         if(err){
//             res.status(400).json({"error":res.message})
//             return;
//         }
//         res.status(200).json({deletedID:this.changes})
//     });
// });


const sqlite3 = require('sqlite3');
const express = require("express");
var app = express();
app.use(express.json())
const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

const db = new sqlite3.Database('./emp_database.db', (err) => {
    if (err) {
        console.error("Erro opening database " + err.message);
    } else {

        db.run('CREATE TABLE employees( \
            employee_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            last_name NVARCHAR(20)  NOT NULL,\
            first_name NVARCHAR(20)  NOT NULL,\
            title NVARCHAR(20),\
            address NVARCHAR(100),\
            country_code INTEGER\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
            }
            let insert = 'INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)';
            db.run(insert, ["Verma", "Chanchal", "SDE", "Indore", +91]);
            
        });
    }
});

app.get("/employees/:id", (req, res, next) => {
    var params = [req.params.id]
    db.get("SELECT * FROM employees where employee_id = ?", [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

app.get("/employees", (req, res, next) => {
    db.all("SELECT * FROM employees", [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json({ rows });
    });
});

app.post("/employees/", (req, res, next) => {
    var reqBody = req.body;
    db.run("INSERT INTO employees (last_name, first_name, title, address, country_code) VALUES (?,?,?,?,?)",
        [reqBody.last_name, reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "employee_id": this.lastID
            })
        });
});

app.patch("/employees/", (req, res, next) => {
    var reqBody = req.body;
    db.run(`UPDATE employees set last_name = ?, first_name = ?, title = ?, address = ?, country_code = ? WHERE employee_id = ?`,
        [reqBody.last_name, reqBody.first_name, reqBody.title, reqBody.address, reqBody.country_code, reqBody.employee_id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

app.delete("/employees/:id", (req, res, next) => {
    db.run(`DELETE FROM user WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
        });
});