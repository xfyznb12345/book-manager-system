const BaseDAO = require('../lib/baseDAO')
const Interest = require('../models').interest

class InterestService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}
module.exports = new InterestService(Interest)
