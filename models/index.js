import User from "./user.js";
import Blog from "./blog.js";
import ReadingLists from "./readingLists.js";
User.hasMany(Blog)
Blog.belongsTo(User);

// User.sync({alter: true});
// Blog.sync({alter: true});
// console.log('Models synced');
User.belongsToMany(Blog, { through: ReadingLists,as: 'readingLists' });
Blog.belongsToMany(User, { through: ReadingLists,as: 'blogList' });
export { User, Blog, ReadingLists };