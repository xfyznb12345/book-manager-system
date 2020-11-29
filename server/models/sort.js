const mongoose = require("mongoose");

module.exports = {
  name: "sort",
  schema: {
    code: {
      type: String,
      required: true
    }, 
    name:{
      type: String,
      required: true
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'category'
    },
    create_time: {
      type: Date,
      default: Date.now
    }, // 创建时间
    update_time: {
      type: Date,
      default: Date.now
    }, // 修改时间
  },
  options: {
    versionKey: false,
    timestamps: { createdAt: 'create_time', updatedAt: 'update_time' }
  }
};
