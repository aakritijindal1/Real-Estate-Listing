const express = require("express");
const Estate = require("./models/property");
const mongoose = require("mongoose");
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8008;

connectToMongoDB("mongodb://127.0.0.1:27017/real-estate-listing")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Routes

app.get("/estates", async (req, res) => {
  try {
    const estates = await Estate.find({});
    res.json(estates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/estates", async (req, res) => {
  try {
    const estate = new Estate(req.body);
    await estate.save();
    res.status(201).json(estate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/estates", async (req, res) => {
  try {
    await Estate.deleteMany({});
    res.json({ message: "All estates deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/property_type", async (req, res) => {
  try {
    const { type } = req.query;
    const estates = await Estate.find({ property_type: type });
    res.json(estates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/bedrooms", async (req, res) => {
  try {
    const { n } = req.query;
    const estates = await Estate.find({ bedrooms: { $gt: Number(n) } });
    res.json(estates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/property_id", async (req, res) => {
  try {
    const estate = await Estate.findById(req.params.property_id);
    if (!estate) return res.status(404).json({ error: "Estate not found" });
    res.json(estate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/property_id", async (req, res) => {
  try {
    const estate = await Estate.findByIdAndUpdate(
      req.params.property_id,
      req.body,
      { new: true }
    );
    if (!estate) return res.status(404).json({ error: "Estate not found" });
    res.json(estate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch("/property_id", async (req, res) => {
  try {
    const estate = await Estate.findByIdAndUpdate(
      req.params.property_id,
      req.body,
      { new: true }
    );
    if (!estate) return res.status(404).json({ error: "Estate not found" });
    res.json(estate);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/property_id", async (req, res) => {
  try {
    const estate = await Estate.findByIdAndDelete(req.params.property_id);
    if (!estate) return res.status(404).json({ error: "Estate not found" });
    res.json({ message: "Estate deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/cheapest", async (req, res) => {
  try {
    const { n } = req.query;
    const estates = await Estate.find({}).sort({ price: 1 }).limit(Number(n));
    res.json(estates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`server started at the port: ${PORT}`));
