const BaseDAO = require('../lib/baseDAO')
const Book = require('../models').book

class BookService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}
module.exports = new BookService(Book)
