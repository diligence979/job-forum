'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');

class PostService extends Service {
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
    const res = await this.ctx.model.Post.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
      }],
    }));
    return Object.assign(SUCCESS, {
      data: res,
    });
  }

  async create(post) {
    const {
      ctx,
    } = this;
    try {
      const res = await this.ctx.model.Post.create(post);
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async find(id) {
    const post = await this.ctx.model.Post.findById(id, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
        attributes: [ 'id', 'username' ],
      }],
    });
    if (!post) {
      return Object.assign(ERROR, {
        msg: 'post not found',
      });
    }
    return Object.assign(SUCCESS, {
      data: post,
    });
  }

  async findByUser(userId, {
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

    if (userId) {
      options.where = {
        user_id: userId
      };
    }
    const post = await this.ctx.model.Post.findAndCountAll(Object.assign(options, {
      include: [{
        model: this.ctx.model.User,
        as: 'user',
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
    user_id,
  }) {
    const post = await this.ctx.model.Post.findById(id);
    if (!post) {
      return Object.assign(ERROR, {
        error_msg: 'post not found',
      });
    } else if (post.user_id.toString() !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to delete others post',
      });
    }
    post.destroy();
    return SUCCESS;
  }

  async update({
    id,
    user_id,
    updates,
  }) {
    const post = await this.ctx.model.Post.findById(id);
    if (!post) {
      return Object.assign(ERROR, {
        msg: 'post not found',
      });
    } else if (post.user_id.toString() !== user_id) {
      return Object.assign(ERROR, {
        msg: 'not allowed to modify others post',
      });
    }
    post.update(updates);
    return SUCCESS;
  }
}

module.exports = PostService;
