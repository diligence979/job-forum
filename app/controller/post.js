'use strict';

const Controller = require('egg').Controller;
class PostController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.post.index(ctx.query);
    ctx.body = res;
  }

  async create() {
    const {
      ctx,
    } = this;
    const created = await ctx.service.post.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;

  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.post.find(id);
  }

  async findByUser() {
    const {
      ctx,
    } = this;
    const userId = ctx.params.id;
    ctx.body = await ctx.service.post.findByUser(userId, ctx.query)
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.post.find(id);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const user_id = ctx.params.user_id;
    const res = await ctx.service.post.del({
      id,
      user_id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const user_id = ctx.params.user_id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.post.update({
      id,
      user_id,
      updates: body,
    });
  }

  async hot() {
    const {
      ctx,
    } = this;    
    ctx.body = await ctx.service.post.hot(ctx.query);
  }
}

module.exports = PostController;
