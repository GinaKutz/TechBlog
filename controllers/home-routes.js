const router = require('express').Router();
const { Blog } = require('../models');

// GET all blog posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [{ model: User, attributes: ['username'] }], // Include username of the creator
    });

    const blogs = dbBlogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Other routes for viewing individual blog posts...

module.exports = router;

