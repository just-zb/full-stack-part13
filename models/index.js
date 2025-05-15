import User from "./user.js";
import Blog from "./blog.js";

User.hasMany(Blog)
Blog.belongsTo(User);

User.sync({alter: true});
Blog.sync({alter: true});
console.log('Models synced');
export { User, Blog };