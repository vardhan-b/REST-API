const express = require("express");

const bodyPraser = require("body-parser");

const ejs = require("ejs");

const mongoose = require("mongoose");

const app = express();

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyPraser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {userNewUrlParser:true});

const userSchema = {
    name: String,
    mobile: String,
    email: String,
    address:{
        street: String,
        locality: String,
        city:String,
        state: String,
         pincode: String,
          coordinatesType: String,
         coordinates: [Number]
    }
};

const User = mongoose.model("user",userSchema);

app.get("/userData",function(req,res){

    User.find(function(err,users){
    
        res.send(users);
    });


app.post("/userData",function(req,res){
const newUser = new User({

    name: req.body.name,
    mobile: req.body.mobile,
    email:req.body.email,
    street:req.body.address.street,   
    locality:req.body.address.locality,   
    city:req.body.address.city,   
    state: req.body.address.state,
    pincode:req.body.address.pincode,
    coordinatesType:req.body.address.coordinatesType,
    coordinates: req.body.address.coordinates
});
newUser.save(function(err,user){
res.send("success");
})
})

});

app.route("/userData/:userName")

.put(function(req,res){
    userData.update(
        {name:req.params.userName},
        { name: req.body.name,
            mobile: req.body.mobile,
            email:req.body.email,
            street:req.body.address.street,   
            locality:req.body.address.locality,   
            city:req.body.address.city,   
            state: req.body.address.state,
            pincode:req.body.address.pincode,
            coordinatesType:req.body.address.coordinatesType,
            coordinates: req.body.address.coordinates},
            {overwrite:true},
            function(err){
                if(!err){
                    res.send("sucess update");
                }
            }
    )

    .delete(function(req,res){
        userData.deleteOne(
         {name:req.params.userName},
           function(err){
               if(err){
                   res.send("success delete");

               }
               else
               res.send(err);
           } 
        )
    })
})

app.listen(3000,function(req,res){
    console.log("on port 3000");
})