'use strict';

const Service = require('egg').Service;
const {
  ERROR,
  SUCCESS,
} = require('../util/util');
class CommentService extends Service {
  async create({
    post_id = null,
    ad_id = null,
    user_id,
    content,
  }) {
    const {
      ctx,
    } = this;
    try {
      if (!content || !user_id || (!post_id && !ad_id)) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: `expected an object with content, user_id, post_id or ad_id but got: ${JSON.stringify({
            post_id,
            ad_id,
            user_id,
            content,
          })}`,
        });
      }
      const res = await ctx.model.Comment.create({
        post_id,
        ad_id,
        user_id,
        content,
      });
      ctx.status = 201;
      if (post_id) {
        const post = await ctx.model.Post.findById(post_id);
        post.increment('comment_size').then().catch(err => {
          console.log(err);
        });
      } else if (ad_id) {
        const ad = await ctx.model.Ad.findById(ad_id);
        ad.increment('comment_size').then().catch(err => {
          console.log(err);
        });
      }
      return Object.assign(SUCCESS, {
        data: res,
      });
    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }

  async del({
    id,
    user_id,
  }) {
    const {
      ctx,
    } = this;
    try {
      const comment = await ctx.model.Comment.findById(id);
      if (!comment) {
        ctx.status = 400;
        return Object.assign(ERROR, {
          msg: 'comment is not exists',
        });
      }
      if (comment.user_id !== parseInt(user_id)) {
        ctx.status = 403;
        return Object.assign(ERROR, {
          msg: 'you can not delete others comment',
        });
      }
      const post = await ctx.model.Post.findById(comment.post_id);
      const ad = await ctx.model.Ad.findById(comment.ad_id);
      const res = await comment.destroy();
      if (post) {
        post.decrement('comment_size').then().catch(err => {
          console.log(err);
        });
      } else if (ad) {
        ad.decrement('comment_size').then().catch(err => {
          console.log(err);
        });
      }
      ctx.status = 200;
      return Object.assign(SUCCESS, {
        data: res,
      });

    } catch (error) {
      ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = CommentService;
