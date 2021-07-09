const express = require('express');
const Bar = require('../models/bar');

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await Bar.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            const bar = await Bar.create({
                name : req.body.name,
                address : req.body.address,
                comment : req.body.comment,
                grade : req.body.grade,
                phone : req.body.phone,
            });
            console.log(bar);
            res.status(201).json(bar);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;