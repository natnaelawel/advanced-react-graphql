const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  async deleteItem(parent, args, ctx, info) {
    const id = args.id;
    const where = { id: args.id };
    // find the item
    // const item = await ctx.db.query.item({ where: { id: id } }, `{id, title}`);
    const item = await ctx.db.query.item({ where }, `{id, title}`);
    // check if the user has permission to do that
    // return ctx.db.mutation.deleteItem({ where: { id } });
    return ctx.db.mutation.deleteItem({ where }, info);
    // delete it
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const password = await bycrpt.hash(args.password, 10);
    // create a user in a database
    const user = await ctx.db.mutation.createUser(
      { data: { ...args, password, permissions: { set: ["USER"] } } },
      info
    );
    // create a jwt token for them
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, args, ctx, info) {
    const email = args.email.toLowerCase();
    const user = await ctx.db.query.user({ where: { email } });
    if(!user){
      throw new Error('No such user found for email ')
    }
    const valid = await bycrpt.compare(args.password,user.password);
    if(!valid){
      throw new Error("password incorrect");

    }
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signout(parent, args, ctx, info){
    ctx.response.clearCookie('token')
    return {message: 'Goodbye!'}
  }
};

module.exports = mutations;
