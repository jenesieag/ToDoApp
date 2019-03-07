
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 3000;
var path = require('path');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views' ,path.join(__dirname,'views'));

var task = ["buy socks", "practise with nodejs"];
var complete = ["finish jquery"];

app.post("/addtask",(req, res) =>{
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});

app.post("/removetask",(req, res) => {
    var completeTask = req.body.check;
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

app.get("/",(req, res) => {
    res.render("index", { task: task, complete: complete });
});

app.listen(port,() =>{
    console.log("server is running on port 3000");
});