import express from 'express';
// 
import { signupUser, loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost, getAllPosts, getPost, updatePost, deletePost } from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { newComment, deleteComment, getComments } from '../controller/comment-controller.js';
// 
import upload from '../utils/upload.js'
// 
const router = express.Router();
 
router.post('/signup', signupUser);
router.post('/login', loginUser);
// middleware->upload.single('file')
router.post('/file/upload', upload.single('file'), uploadImage);
router.post('/file/filename', getImage);
// 
router.post('/create',authenticateToken, createPost);
router.get('/posts',authenticateToken, getAllPosts);
router.get('/post/:id',authenticateToken, getPost);
router.put('/update/:id',authenticateToken, updatePost);
router.delete('/delete/:id',authenticateToken, deletePost);

router.post('/comment/new',authenticateToken, newComment);
router.get('/comments/:id',authenticateToken, getComments);
router.delete('/comment/delete/:id',authenticateToken, deleteComment);
// 
export default router;






// import express from 'express';
// import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
// import { uploadImage, getImage } from '../controller/image-controller.js';
// import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
// import { loginUser, singupUser, logoutUser } from '../controller/user-controller.js';
// import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';
// import upload from '../utils/upload.js';
// const router = express.Router();
// router.post('/login', loginUser);
// router.post('/signup', singupUser);
// router.post('/logout', logoutUser);
// router.post('/token', createNewToken);
// router.post('/create', authenticateToken, createPost);
// router.put('/update/:id', authenticateToken, updatePost);
// router.delete('/delete/:id', authenticateToken, deletePost);
// router.get('/post/:id', authenticateToken, getPost);
// router.get('/posts', authenticateToken, getAllPosts);
// router.post('/file/upload', upload.single('file'), uploadImage);
// router.get('/file/:filename', getImage);
// 
// router.post('/comment/new', newComment);
// router.get('/comments/:id', getComments);
// router.delete('/comment/delete/:id', deleteComment);
// router.post('/comment/new', authenticateToken, newComment);
// router.get('/comments/:id', authenticateToken, getComments);
// router.delete('/comment/delete/:id', authenticateToken, deleteComment);
// 
// export default router;