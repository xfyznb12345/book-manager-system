module.exports = {
  name: "book",
  schema: {
    title:String,
    author:String,
    press:String,
    keyWord:String,
    abstract:String,
    code:String,
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
}