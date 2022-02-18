const express = require("express");
const bp = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const res = require("express/lib/response");

const app=express()
app.use(bp.urlencoded({extended:true}));

app.set("view-engine","ejs");

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true});

const articleSchema={
    title: String,
    content: String
}

const Article = mongoose.model("article",articleSchema);

app.route("/articles")
.get(function(req,res) {
    Article.find({},function(err,fArticles){
        if(!err){
            res.send(fArticles);
        }else{
            res.send(err);
        }
    })
})
.post(function(req,res){

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    })
    newArticle.save(function(err){
        if(!err){
            res.send("Successfully saved a new article.");
        }else{
            res.send(console.log(err));
        }
    })
})

.delete(function (req,res) {
    Article.deleteMany({},function(err){
        if(!err){
            console.log("successfully deleted all articles");
        }else{
            console.log(err);
        }
    });
    
});

app.route("/articles/:usertitle")
.put(function(req,res){
    Article.update(
        {title:req.params.usertitle},
        {title:req.body.title, content: req.body.content},
        
        function(err){
            if(!err){
                console.log("Successfully updated");
            }else{
                console.log(err);
            }
        }      
    )
})

.patch(function(){
    Article.update(

    )
})

.delete(function(){
    
})

app.listen(3000,function(req,res){
    console.log("server running at 3000");
})