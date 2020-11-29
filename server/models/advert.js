const mongoose = require("mongoose");

module.exports = {
  name: "advert",
  schema: {
    title: {
      type: String,
      required: true
    }, // 标题
    book: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:'book'
    }, // 关联书
    image:String, //封面
    state: {
      type:Number,
      default: 0
    }, // 0:开启, 1:关闭
    remark:String,
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