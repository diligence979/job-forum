'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.comment.index(ctx.query);
    ctx.body = res;
  }

  async create() {
    const {
      ctx,
    } = this;
    const {
      post_id = null,
      ad_id = null,
      user_id = null,
      hr_id = null,
      content,
    } = ctx.request.body;
    ctx.body = await ctx.service.comment.create({
      post_id,
      ad_id,
      user_id,
      hr_id,
      content,
    });
  }

  async userDestroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const user_id = ctx.params.user_id;
    ctx.body = await ctx.service.comment.userDel({
      id,
      user_id,
    });
  }

  async hrDestory() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const hr_id = ctx.params.hr_id;
    ctx.body = await ctx.service.comment.hrDel({
      id,
      hr_id
    });
  }
}

module.exports = CommentController;
