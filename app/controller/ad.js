'use strict';

const Controller = require('egg').Controller;
class AdController extends Controller {
  async index() {
    const {
      ctx,
    } = this;
    const res = await ctx.service.ad.index(ctx.query);
    ctx.body = res;
  }

  async create() {
    const {
      ctx,
    } = this;
    const created = await ctx.service.ad.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = created;
  }

  async find() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.ad.find(id);
  }

  async edit() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    ctx.body = await ctx.service.ad.find(id);
  }

  async destroy() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const hr_id = ctx.params.hr_id;
    const res = await ctx.service.ad.del({
      id,
      hr_id,
    });
    ctx.status = 200;
    ctx.body = res;
  }

  async update() {
    const {
      ctx,
    } = this;
    const id = ctx.params.id;
    const hr_id = ctx.params.hr_id;
    const body = ctx.request.body;
    ctx.body = await ctx.service.ad.update({
      id,
      hr_id,
      updates: body,
    });
  }
}

module.exports = AdController;
