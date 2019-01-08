'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');

class PostService extends Service {
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
      }, {
        model: this.ctx.model.Comment,
        as: 'comment',
        attributes: [ 'id', 'content', 'created_at', 'updated_at' ],
        include: [{
          model: this.ctx.model.User,
          attributes: [ 'username' ],
        }],
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
