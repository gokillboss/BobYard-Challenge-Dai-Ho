import axios from "axios";

// Tạo instance của axios
const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Comment APIs
export const getComments = () => api.get("/comments");

export const getCommentById = (id) => api.get(`/comments/${id}`);

export const addComment = (data) => api.post("/comments", data);

export const editComment = (id, data) => api.put(`/comments/${id}`, data);

export const deleteComment = (id) => api.delete(`/comments/${id}`);

export default api;
