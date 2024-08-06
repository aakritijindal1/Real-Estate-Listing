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
app.post("/api/property"),
  async (req, res) => {
    const body = req.body;
    if (
      !body ||
      !body.Title ||
      !body.Description ||
      !body.Price ||
      !body.Property_type ||
      !body.Listing_type ||
      !body.Bedrooms ||
      !body.Property_id
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await Property.create({
      title: body.Title,
      description: body.Description,
      price: body.Price,
      property_type: body.Property_type,
      listing_type: body.Listing_type,
      bedrooms: body.Bedrooms,
      property_id: body.Property_id,
    });
    console.log("result", result);
    return res.status(201).json({ msg: "success" });
  };

app.get("/", (req, res) => {
  return res.render("homepage");
});

app.listen(PORT, () => console.log(`server started at the port: ${PORT}`));
