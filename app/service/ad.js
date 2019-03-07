'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');

class AdService extends Service {
  async index({
    offset = 0,
    limit = 30,
    order_by = 'created_at',
    order = 'DESC'
  }) {
    const options = {
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
    };
    const res = await this.ctx.model.Ad.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.Hr,
        as: 'hr',
        attributes: [ 'id', 'username' ],
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async create(ad) {
    const {
      ctx,
    } = this;
    try {
      const res = await this.ctx.model.Ad.create(ad);
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const ad = await this.ctx.model.Ad.findById(id, {
      include: [{
        model: this.ctx.model.Hr,
        as: 'hr',
        attributes: [ 'id', 'username' ],
      }],
    });
    if (!ad) {
      return Object.assign(ERROR, {
        msg: 'ad not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: ad,
    });
  }

  async findByHr(hrId, {
    offset = 0,
    limit = 30,
    order_by = 'created_at',
    order = 'DESC'
  }) {
    const options = {
      offset: parseInt(offset),
      limit: parseInt(limit),
      order: [
        [ order_by, order.toUpperCase() ],
      ],
    };

    if (hrId) {
      options.where = {
        hr_id: hrId
      };
    }
    const post = await this.ctx.model.Ad.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.Hr,
        as: 'hr',
        attributes: [ 'id', 'username' ],
      }],
    }));
    if (!post) {
      return Object.assign(ERROR, {
        msg: 'post not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: post,
    });
  }

  async del({
    id,
    hr_id,
  }) {
    const ad = await this.ctx.model.Ad.findById(id);
    if (!ad) {
      return Object.assign(ERROR, {
        error_msg: 'ad not found',
      });
    } else if (ad.hr_id.toString() !== hr_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others ad',
      });
    }
    ad.destroy();
    return SUCCESS;
  }

  async update({
    id,
    hr_id,
    updates,
  }) {
    const ad = await this.ctx.model.Ad.findById(id);
    if (!ad) {
      return Object.assign(ERROR, {
        msg: 'ad not found',
      });
    } else if (ad.hr_id.toString() !== hr_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to modify others ad',
      });
    }
    ad.update(updates);
    return SUCCESS;
  }
}

module.exports = AdService;
