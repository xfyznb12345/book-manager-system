const BaseDAO = require('../lib/baseDAO')
const Category = require('../models').category

class CategoryService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}
module.exports = new CategoryService(Category)
