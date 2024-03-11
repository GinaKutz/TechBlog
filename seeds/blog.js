const { Blog } = require('../models');

const blogData = [
  {
    title: 'First Blog Post',
    content: 'This is the content of the first blog post.',
    user_id: 1, // Assuming user_id 1 exists in your database
  },
  {
    title: 'Second Blog Post',
    content: 'This is the content of the second blog post.',
    user_id: 2, // Assuming user_id 2 exists in your database
  },
  // Add more blog data as needed
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;