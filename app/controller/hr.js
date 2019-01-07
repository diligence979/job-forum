'use strict';

const { Controller } = require('egg');
const { toInt } = require('../util/util');


class HrController extends Controller {
  async show() {
    const { ctx } = this;
    ctx.body = await ctx.model.Hr.findById(toInt(ctx.params.id));
  }

  async create() {
    const { ctx } = this;
    ctx.status = 201;
    ctx.body = await ctx.service.hr.create(ctx.request.body);
  }

  async update() {
    const { ctx } = this;
    const id = toInt(ctx.params.id);
    const hr = ctx.request.body;
    ctx.body = await ctx.service.hr.update({
      id,
      hr,
    });
  }

  async destroy() {
    const { ctx } = this;
    const id = toInt(ctx.params.id);
    ctx.body = await ctx.service.hr.del(id);
  }

  async login() {
    const { ctx } = this;
    const {
      username,
      password,
    } = ctx.request.body;
    ctx.body = await ctx.service.hr.login({
      username,
      password,
    });
  }

  async find() {
    const { ctx } = this;
    const id = toInt(ctx.params.id);
    ctx.body = await ctx.service.hr.find(id);
  }
}

module.exports = HrController;
