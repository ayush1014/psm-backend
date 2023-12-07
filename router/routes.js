const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const PostController = require('../controllers/postController');


router.post("/create-user", UserController.createUser);
router.post("/followUser", UserController.followUser);
router.get("/getAllUsers", UserController.getAllUser);
router.patch("/unfollowUser", UserController.unfollowUser);
router.get("/getNonFollowingUsers/:userId", UserController.getNonFollowingUsers);
router.post("/login", AuthController.login);
router.post("/create-post", PostController.createPost);
router.get("/getAllPosts", PostController.getAllPosts);
router.delete("/deletePost/:postId" , PostController.deletePost);
router.patch("/updatePost", PostController.updatePost);

module.exports = router;