const mongoose = require("mongoose");

module.exports = {
  name: "user",
  schema: {
    userName: {
      type: String,
      required: true
    }, // 用户名
    passWord: {
      type: String,
      required: true,
      select:false,
      set(val){
        return require('bcrypt').hashSync(val,10)
      }
    }, // 密码
    role:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'role'
    },
    collect:Array, //图书收藏
    icon:String, //头像
    nickName: String, // 昵称
    phone: String, // 电话号码
    email: String, // 邮箱
    birthday: String, // 生日
    status:{
      type:Number,
      default:1
    },
    last_login_time: String, // 上次登录时间
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
