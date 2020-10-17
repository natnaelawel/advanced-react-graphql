const mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // first take a copy of the updates
    const updates = { ...args };
    // remove the id of the update
    delete updates.id;
    const item = await ctx.db.mutation.updateItem(
      {
        data: {
          ...updates,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    return item;
  },
  async deleteItem(parent, args, ctx, info){
    const id = args.id
    const where = {id: args.id}
    // find the item
    // const item = await ctx.db.query.item({ where: { id: id } }, `{id, title}`);
    const item = await ctx.db.query.item({where}, `{id, title}`);
    // check if the user has permission to do that 
    // return ctx.db.mutation.deleteItem({ where: { id } });
    return ctx.db.mutation.deleteItem({where}, info);
    // delete it
  }
};

module.exports = mutations;
