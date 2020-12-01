const WebDAO = require('../lib/WebDAO')
const Advert = require('../models').advert

class AdverService extends WebDAO {
  constructor(model) {
    super(model)
  }
}

module.exports = new AdverService(Advert)
