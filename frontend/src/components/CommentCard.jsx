import React, { useState } from "react";
import { Card, Row, Col, Image, Button, Form } from "react-bootstrap";
import { HandThumbsUp, Pencil, Trash } from "react-bootstrap-icons";
import "./CommentCard.css";

const CommentCard = ({ comment, onEdit, onDelete, onLike }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [localLikes, setLocalLikes] = useState(comment.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);

  // Format the time since comment was posted (e.g. "11 months ago")
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffMonths = (now.getFullYear() - commentDate.getFullYear()) * 12 + 
                       (now.getMonth() - commentDate.getMonth());
    
    if (diffMonths >= 12) {
      const years = Math.floor(diffMonths / 12);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    } else {
      const diffDays = Math.floor((now - commentDate) / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
      } else {
        return 'Today';
      }
    }
  };

  const handleSaveEdit = () => {
    if (editText.trim() === "") return;
    
    // Call the onEdit function with the updated text
    onEdit(editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  const handleLike = () => {
    if (!hasLiked) {
      const newLikesCount = localLikes + 1;
      setLocalLikes(newLikesCount);
      setHasLiked(true);
      
      // Nếu có hàm callback onLike, gọi để cập nhật trên server
      if (onLike) {
        onLike(comment.id, newLikesCount);
      }
    } else {
      const newLikesCount = localLikes - 1;
      setLocalLikes(newLikesCount);
      setHasLiked(false);
      
      // Nếu có hàm callback onLike, gọi để cập nhật trên server
      if (onLike) {
        onLike(comment.id, newLikesCount);
      }
    }
  };

  return (
    <Card className="border-0 bg-transparent comment-card mb-3">
      <Row className="g-0">
        <Col xs={1} sm={1} md="auto" className="me-2">
          <Image
            src={comment.image || "https://via.placeholder.com/40"}
            roundedCircle
            width={40}
            height={40}
            alt={comment.author}
            className="comment-avatar"
          />
        </Col>
        <Col>
          <div className="comment-header d-flex align-items-center mb-1">
            <span className="fw-bold me-2">{comment.author || "@username"}</span>
            <small className="text-muted">{formatTimeAgo(comment.date)}</small>
          </div>
          
          {isEditing ? (
            <Form className="mb-2">
              <Form.Group>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="mb-2"
                />
              </Form.Group>
              <div className="d-flex">
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={handleSaveEdit}
                  disabled={editText.trim() === "" || editText === comment.text}
                  className="me-2"
                >
                  Save
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <div className="comment-text mb-2">
              {comment.text}
            </div>
          )}
          
          <div className="d-flex align-items-center comment-actions">
            <Button 
              variant="link" 
              className={`p-0 me-3 d-flex align-items-center ${hasLiked ? 'text-primary' : 'text-dark'} reaction-btn`}
              size="sm"
              onClick={handleLike}
            >
              <HandThumbsUp className="me-1" />
              <span>{localLikes}</span>
            </Button>
            
            {(onEdit && onDelete && !isEditing) && (
              <div className="ms-auto admin-actions">
                <Button 
                  size="sm" 
                  variant="link" 
                  className="text-primary p-1"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="me-1" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="link" 
                  className="text-danger p-1"
                  onClick={() => onDelete && onDelete()}
                >
                  <Trash className="me-1" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CommentCard;