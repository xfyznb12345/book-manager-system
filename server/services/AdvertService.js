const BaseDAO = require('../lib/baseDAO')
const Advert = require('../models').advert

class AdverService extends BaseDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new AdverService(Advert)
