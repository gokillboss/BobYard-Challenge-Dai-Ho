import React, { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard";
import { Container, Spinner, Alert, Row, Col, Form, Button } from "react-bootstrap";
import { getComments, addComment, editComment, deleteComment } from "../api/api";


const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getComments();
      setComments(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const commentData = {
        author: "Admin",
        text: newComment,
        date: new Date().toISOString(),
        likes: 0,
        image: ""
      };

      const response = await addComment(commentData);
      setComments(prevComments => [response.data, ...prevComments]);
      setNewComment("");
      setError("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Failed to add your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditComment = async (id, updatedText) => {
    try {
      const commentToUpdate = comments.find(comment => comment.id === id);
      if (!commentToUpdate) return;

      const updatedComment = {
        ...commentToUpdate,
        text: updatedText
      };

      await editComment(id, updatedComment);
      
      // Update the comment in the state
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id ? { ...comment, text: updatedText } : comment
        )
      );
      setError("");
    } catch (err) {
      console.error("Error updating comment:", err);
      setError("Failed to update the comment. Please try again.");
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      
      // Remove the comment from the state
      setComments(prevComments => 
        prevComments.filter(comment => comment.id !== id)
      );
      setError("");
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Failed to delete the comment. Please try again.");
    }
  };

  // Thêm hàm xử lý like comment
  const handleLikeComment = async (id, newLikesCount) => {
    try {
      const commentToUpdate = comments.find(comment => comment.id === id);
      if (!commentToUpdate) return;

      const updatedComment = {
        ...commentToUpdate,
        likes: newLikesCount
      };

      // Gọi API để cập nhật likes trên server
      await editComment(id, updatedComment);
      
      // Cập nhật state để hiển thị giá trị mới
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === id ? { ...comment, likes: newLikesCount } : comment
        )
      );
    } catch (err) {
      console.error("Error updating likes:", err);
      setError("Failed to update likes. Please try again.");
    }
  };

  const sortComments = (comments) => {
    if (sortBy === "newest") {
      return [...comments].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "top") {
      return [...comments].sort((a, b) => b.likes - a.likes);
    }
    return comments;
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} lg={10} xl={8}>
          {/* Comment count and sort section */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="mb-0">{comments.length} Comments</h5>
            <div className="d-flex align-items-center">
              <i className="bi bi-filter me-2"></i>
              <Form.Select 
                size="sm" 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: "auto" }}
              >
                <option value="newest">Sort by: Newest first</option>
                <option value="top">Sort by: Top comments</option>
              </Form.Select>
            </div>
          </div>

          {/* Error message if any */}
          {error && (
            <Alert variant="danger" className="my-3" dismissible onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Comment input section */}
          <div className="d-flex mb-4 comment-input-section">
            <div className="me-3">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Admin " 
                className="rounded-circle" 
                width={40} 
                height={40} 
              />
            </div>
            <Form className="flex-grow-1" onSubmit={handleCommentSubmit}>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Add a comment as Admin..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border-top-0 border-start-0 border-end-0 rounded-0 px-0"
                  disabled={submitting}
                />
              </Form.Group>
              <div className="d-flex justify-content-end mt-2">
                <Button 
                  variant="outline-secondary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setNewComment("")}
                  disabled={submitting || !newComment.trim()}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                >
                  {submitting ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-1"
                      />
                      Posting...
                    </>
                  ) : (
                    "Comment"
                  )}
                </Button>
              </div>
            </Form>
          </div>
          
          {/* Divider */}
          <hr className="my-4" />

          {/* Comments section */}
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" variant="secondary" />
              <p className="mt-3 text-muted">Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center my-5">
              <i className="bi bi-chat-left-text" style={{ fontSize: "2rem", color: "#ccc" }}></i>
              <p className="text-muted mt-3">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="comment-list">
              {sortComments(comments).map((comment) => (
                <CommentCard 
                  key={comment.id} 
                  comment={comment} 
                  onEdit={(updatedText) => handleEditComment(comment.id, updatedText)}
                  onDelete={() => handleDeleteComment(comment.id)}
                  onLike={(newLikesCount) => handleLikeComment(comment.id, newLikesCount)}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CommentsPage;