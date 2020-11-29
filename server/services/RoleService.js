const BaseDAO = require('../lib/baseDAO')
const Role = require('../models').role

class RoleService extends BaseDAO {
  constructor(model) {
    super(model)
  }

}
module.exports = new RoleService(Role)
