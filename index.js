const express= require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-Parser');
const cors = require("cors");
const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'harsh'
});
app.use(cors());
app.use(express.json());
app.post('/create',(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const age=req.body.age;
    const country=req.body.country;
    const Position=req.body.Position;
    const wage= req.body.wage;
    con.query("insert into employee (name,age,country,Position,wage) VALUES(?,?,?,?,?)",[name,age,country,Position,wage],(err,rs)=>{
        if(err){
            res.send("Something Wents Wrong:"+err);
        }
        else{
            res.send("Values Inserted!")
        }
    });
});
app.put('/update',(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const wage=req.body.wage;

    con.query("update employee SET [wage]='?' where name='?'",[wage,name],(err,rs)=>{
        if(err){
            res.send("Something Wents Wrong:"+err);
        }
        else{
            res.send("Values updated!")
        }
    });
});
app.delete('/delete',(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    con.query("DELETE FROM `employee` WHERE [name]='?'",name,(err,rs)=>{
        if(err){
            res.send("Something Wents Wrong:"+err);
        }
        else{
            res.send("Deleted!")
        }
    });
});
app.get('/employee',(req,res)=>{
    con.query('select * from employee',(err,rs)=>{
        if(!err)
        res.send(rs);
    });
});
app.listen((7240),()=>{
    console.log("Server started!!");
});