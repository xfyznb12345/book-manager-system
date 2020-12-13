const mongoose = require("mongoose");
module.exports = {
  name: "interest",
  schema: {
    book: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'book'
    },
    collect:{
      type:Boolean,
      default:false
    },
    rate:{
      type:Number,
      default:0
    },
    user:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user'
    }
  }
}