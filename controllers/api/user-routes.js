const router = require('express').Router();
const { User, Blog } = require('../../models');

// CREATE new blog post
router.post('/blog', async (req, res) => {
  try {
    const dbBlogData = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id, // Assuming user_id is stored in the session
    });

    res.status(200).json(dbBlogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Other routes for user authentication (signup, login, logout)...

module.exports = router;

