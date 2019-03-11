'use strict';

const Service = require('egg').Service;
const md5 = require('js-md5');
const { ERROR, SUCCESS } = require('../util/util');

class HrService extends Service {
  async create(hr) {
    const { ctx } = this;
    try {
      if (!hr.username || !hr.password) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with username, password but got: ${JSON.stringify(hr)}`,
        });
      }

      const md5Passwd = md5(hr.password);
      hr = Object.assign(hr, {
        password: md5Passwd,
      });

      const hrDB = await ctx.model.Hr.findOne({
        where: {
          username: hr.username,
        },
      });

      if (!hrDB) {
        const res = await this.ctx.model.Hr.create(hr);
        ctx.status = 201;
        return Object.assign(SUCCESS, {
          data: res,
        });
      }

      ctx.status = 406;
      return Object.assign(ERROR, {
        msg: 'username already exists',
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del(id) {
    const { ctx } = this;
    try {
      const hr = await ctx.model.Hr.findById(id);
      if (!hr) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'hr not found',
        });
      }
      hr.destroy();
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: hr,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async update({ id, hr }) {
    const { ctx } = this;
    try {
      const hrDB = await ctx.model.Hr.findById(id);
      if (!hrDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'hr not found',
        });
      }
      const md5Passwd = md5(hr.password);
      hr = Object.assign(hr, {
        password: md5Passwd,
      });
      const res = await hrDB.update(hr);
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }

  async login({ username, password }) {
    const { ctx } = this;
    try {
      const hr = await ctx.model.Hr.findOne({
        where: {
          username: username.toString(),
        },
      });
      if (!hr) {
        return Object.assign(ERROR, {
          msg: 'username is error',
        });
      }
      if (md5(password) === hr.password) {
        ctx.status = 200;
        const hash = md5.hex(password);
        ctx.cookies.set('token', hash, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        ctx.cookies.set('hr_id', hr.id, {
          httpOnly: false,
          signed: false,
          maxAge: 3600 * 1000,
          path: '/',
        });
        return Object.assign(SUCCESS, {
          data: Object.assign(hr, {
            password: '',
          }),
        });
      }
      return Object.assign(ERROR, {
        msg: 'password is error',
      });


    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const { ctx } = this;
    try {
      const hr = await ctx.model.Hr.findById(id);
      if (!hr) {
        ctx.status = 401;
        return Object.assign(ERROR, {
          msg: 'hr not found',
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: hr,
      });

    } catch (error) {
      throw (500);
    }
  }

  async avatar({id, avatar}) {
    const { ctx } = this;
    try {
      const hrDB = await ctx.model.Hr.findById(id);
      if (!hrDB) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'hr not found',
        });
      }
      const res = await hrDB.update({avatar});
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.throw(500);
    }
  }
}

module.exports = HrService;
