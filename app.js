const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/",function(req,res){
    const day = date.getDay();
    res.render("list.ejs", {listTitle: day, newItems: items});
});

app.get("/work", function(req, res){
    res.render("list",{listTitle: "Work List", newItems: workItems});
})
app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "  Work List"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/about", function(req,res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("Server has started at port 3000");
});

/*
    ****************    lEARNING EJS    ***************************
    1. EJS - Embedded JavaScript
    2. EJS creates tempelates whose data can be changed from the server.
    3. <%= keyword %>   --> this marker this used to define what data will be changed from the server.

    4. app.set('view engine', 'ejs');   --> to use ejs
    5. ejs template should be in "views" folder.
*/