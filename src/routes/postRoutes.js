const PostController = require('../controllers/PostController');
const express = require('express');

const route = express.Router();

route.get('/', PostController.index);
route.post('/', PostController.create);
route.put('/:_id', PostController.edit);
route.delete('/:_id', PostController.delete);

module.exports = route;
