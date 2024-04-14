//Endpoints (CRUD)
const { Router } = require('express');
const { getAllPosts, createPost, deletePost } = require('../controllers/post.controller');
const router = Router();

router.get('/posts', getAllPosts);
router.post('/posts', createPost);
router.delete('/posts/:id', deletePost);

module.exports = router;