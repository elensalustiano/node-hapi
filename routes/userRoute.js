
const joi = require('joi')
const BaseRoute = require('./base/baseRoute');

class UserRouter extends BaseRoute {
  constructor(db) {
    super();
    this._db = db;
  }

   register() {
    return {
      method: 'POST',
      path: '/user',
      config: {
        tags: ['api'],
        description: 'Registrar usuario',
        notes: 'retorna os dados do usuario',
        validate: {
          failAction: (req, h, err) => {
            throw err;
          },
          payload: {
            email: joi.string().max(100).required(),
            cpf: joi.string().max(11).required(),
            name: joi.string().max(100).required(),
            phone: joi.number(),
            password: joi.string().max(100).required()
          }
        }
      },
      handler: (req) => {
        const item = req.payload;
        //TODO criptografar password
        return this._db.create(item);
      }
    }
  }

  update() {
    return {
      method: 'PATCH',
      path: '/user',
      handler: (req) => {
        return 'update';
        const item = req.payload
        return this._db.update(condition, item);
      }
    }
  }

  delete() {
    return {
      method: 'GET',
      path: '/user',
      handler: (req) => {
        return 'delete';
        const { id } = req.payload;
        return this._db.delete(id);
      }
    }
  }

  login() {
    return {
      method: 'POST',
      path: '/login',
      handler: (req) => {
        const item = req.payload;
        return this._db.find(item);
      }
    }
  }

  changePassword() {
    return {
      method: 'PATCH',
      path: '/password',
      handler: (req) => {
        return 'pass';
        const { pass } = req.payload;
        //TODO criptografar password
        return this._db.update(item);
      }
    }
  }
}

module.exports = UserRouter;