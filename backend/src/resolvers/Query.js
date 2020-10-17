/// if there is no filtering or any authentication 
const {forwardTo} = require('prisma-binding')

const Query = {
    items: forwardTo('db'),
    item: forwardTo('db'),
    itemsConnection: forwardTo('db')
    // async items(parent, args, ctx, info){
    //     const items = await ctx.db.query.items();
    //     return items; 
    // }
};

module.exports = Query;


// [{"__id":"ckgand62nrq2g0950rs35ri8h","largeImage":"https://res.cloudinary.com/dfkz0zqg8/image/upload/c_scale,q_auto,w_1000/v1602755673/sickfits/xhob6v2tlmgqmawaytiz.jpg","image":"https://res.cloudinary.com/dfkz0zqg8/image/upload/v1602755673/sickfits/xhob6v2tlmgqmawaytiz.jpg","description":"tiny shoe","price":32,"__typename":"Item","id":"ckgand62nrq2g0950rs35ri8h","title":"Shoe 1"},{"__id":"ckgao8jzyrtmm0950gsgx997w","largeImage":"https://res.cloudinary.com/dfkz0zqg8/image/upload/c_scale,q_auto,w_1000/v1602756929/sickfits/fkuny7zubkk2qrdlzil4.jpg","image":"https://res.cloudinary.com/dfkz0zqg8/image/upload/v1602756929/sickfits/fkuny7zubkk2qrdlzil4.jpg","description":"a pair yellowish shoe","price":78,"__typename":"Item","id":"ckgao8jzyrtmm0950gsgx997w","title":"Women's shoe"},{"__id":"ckgaoojkbsdwt0a35mq3hzeie","largeImage":"https://res.cloudinary.com/dfkz0zqg8/image/upload/c_scale,q_auto,w_1000/v1602757900/sickfits/ankss1c5vjacmkxgqjsh.jpg","image":"https://res.cloudinary.com/dfkz0zqg8/image/upload/v1602757900/sickfits/ankss1c5vjacmkxgqjsh.jpg","description":"new stylish leather bag","price":23,"__typename":"Item","id":"ckgaoojkbsdwt0a35mq3hzeie","title":"Bag"}]