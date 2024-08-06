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
      type: String,
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
      type: String,
      required: true,
    },
    Property_id: {
      type: String,
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
const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
