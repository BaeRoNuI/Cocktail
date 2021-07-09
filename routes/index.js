const express = require('express');
const Bar = require('../models/bar');
const Cocktail = require('../models/cocktail');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const bars = await Bar.findAll();
        res.render('sequelize', { bars });
    } catch {
        console.error(err);
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const cocktails = await Cocktail.findAll();
        res.render('sequelize', { cocktails });
    } catch {
        console.error(err);
        next(err);
    }
});

module.exports = router;