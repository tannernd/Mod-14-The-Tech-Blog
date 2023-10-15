// import models
const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

// Posts belongsTo User
Posts.belongsTo(User, {
    foreignKey: 'user_id',
});

// User has many Posts
User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comments belongsTo User
Comments.belongsTo(User, {
    foreignKey: 'user_id',
})

// User has many Comments
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Comments belongsTo Posts
Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
})

// Posts has many Comments
Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = {
    User,
    Posts,
    Comments
  };