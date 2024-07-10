const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../models/item.js');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});


// @route   GET api/items/:id
// @desc    Get An Item By ID
// @access  Public
router.get('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            if (!item) {
                return res.status(404).json({ success: false, message: 'Item not found' });
            }
            res.json(item);
        })
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route   PUT api/items/:id
// @desc    Update An Item
// @access  Public
router.put('/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => res.json(item))
        .catch(err => res.status(404).json({ success: false }));
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
