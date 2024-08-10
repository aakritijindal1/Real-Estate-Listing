const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Property_type: {
      type: String,
      required: true,
    },
    Listing_type: {
      type: String,
      required: true,
    },
    Bedrooms: {
      type: Number,
      required: true,
    },
    Property_id: {
      type: Number,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
const Estate = mongoose.model("Property", propertySchema);

module.exports = Estate;
