const db = require('../models');
const Comment = db.comments;

// get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({ order: [['date', 'DESC']] });
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// add new comment
exports.addComment = async (req, res) => {
  try {
    const { text, image } = req.body;
    const comment = await Comment.create({
      author: "Admin",
      text,
      date: new Date(),
      image: image || null,
      likes: 0
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// get comment by id
exports.getCommentById = async (req, res) => {
    try {
      const id = req.params.id;
      const comment = await Comment.findByPk(id);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.json(comment);
    } catch (err) {
      console.error("Error fetching comment by ID:", err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Edit comment by id
exports.editComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { text } = req.body;

    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete comment by id
exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Comment.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: 'Comment not found' });

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
