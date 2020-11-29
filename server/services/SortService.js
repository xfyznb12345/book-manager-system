const BaseDAO = require('../lib/baseDAO')
const Sort = require('../models').sort
class SortService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}
module.exports = new SortService(Sort)
