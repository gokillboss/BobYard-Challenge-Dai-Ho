const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');


// get all comments
router.get('/', commentController.getAllComments);

//get comment by id
router.get('/:id', commentController.getCommentById);

// add new comment
router.post('/', commentController.addComment);

// Edit comment by id
router.put('/:id', commentController.editComment);

// delete comment by id
router.delete('/:id', commentController.deleteComment);



module.exports = router;
