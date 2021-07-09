const express = require('express');
const Cocktail = require('../models/cocktail');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await Cocktail.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const bar = await Cocktail.create({
                name : req.body.name
            });
            console.log(Cocktail);
            res.status(201).json(bar);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;