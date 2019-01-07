'use strict';

const { Controller } = require('egg');
const { toInt } = require('../util/util');


class UserController extends Controller {
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.model.User.findById(toInt(ctx.params.id));
  }

  async create() {
    const { ctx } = this;
    ctx.status = 201;
    ctx.body = await ctx.service.user.create(ctx.request.body);
  }

  async update() {
    const { ctx } = this;
    const id = toInt(ctx.params.id);
    const user = ctx.request.body;
    ctx.body = await ctx.service.user.update({
      id,
      user,
    });
  }

  async destroy() {
    const { ctx } = this;
    const id = toInt(ctx.params.id);
    ctx.body = await ctx.service.user.del(id);
  }

  async login() {
    const { ctx } = this;
    const {
      username,
      password,
    } = ctx.request.body;
    ctx.body = await ctx.service.user.login({
      username,
      password,
    });
  }

  async find() {
    const { ctx } = this;
    const id = toInt(ctx.params.id);
    ctx.body = await ctx.service.user.find(id);
  }
}

module.exports = UserController;
