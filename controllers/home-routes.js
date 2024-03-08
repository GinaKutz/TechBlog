const router = require('express').Router();
const { Gallery, Painting } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.findAll({
      include: [
        {
          model: Painting,
          attributes: ['id', 'title', 'artist', 'exhibition_date'],
        },
      ],
    });

    res.render('homepage', { galleries, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Gallery route (requires authentication)
router.get('/gallery/:id', withAuth, async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: ['id', 'title', 'artist', 'exhibition_date'],
        },
      ],
    });

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }

    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes...

module.exports = router;
