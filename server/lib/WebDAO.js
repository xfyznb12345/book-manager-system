class WebDAO {
  /**
   * 构造方法
   * @param {function} model mongoose model对象，初始化时必须
   */
  constructor(model) {
    this.model = model
  }
  /**
   * 1、轮播图查询
   * 条件查询，多个结果
   * @param {Object} condition 查询条件
   * @param {Object} back 返回结果筛选
   * @return {Array} 查询结果
   */
  async findManyBack (condition, back) {
    const result = await this.model.find(condition, back)
    return result
  }
}

module.exports = WebDAO
