const User = require('./User');
const Post = require('./Post');

// Define associations
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' // This ensures that when a user is deleted, all their posts are also deleted
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };

