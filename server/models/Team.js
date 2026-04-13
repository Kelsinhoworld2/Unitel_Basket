const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    city: {
      type: String,
      default: ""
    },

    wins: {
      type: Number,
      default: 0
    },

    losses: {
      type: Number,
      default: 0
    },

    points: {
      type: Number,
      default: 0
    },

    rank: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Team", TeamSchema);
