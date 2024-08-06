const express = require("express");
const Property = require("./models/property");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8008;

connectToMongoDB("mongodb://127.0.0.1:27017/real-estate-listing")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

//Routes

app.post('/addtask', function(req,res){
    Property.create({
          title: req.body.Title,
      description: req.body.Description,
      price: req.body.Price,
      property_type: req.body.Property_type,
      listing_type: req.body.Listing_type,
      bedrooms: req.body.Bedrooms,
      property_id: req.body.Property_id,
    })
    .then(newTask => {
        console.log("Successfully Created Task!", newTask);
        res.redirect('back');
    })
    .catch(err => {
        console.log("Error Creating Task!!", err);
        // res.status(500).send("Error Creating Task!!");
        res.redirect('back');
    });
});

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.listen(PORT, () => console.log(`server started at the port: ${PORT}`));
