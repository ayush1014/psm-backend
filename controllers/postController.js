const Users = require("../models/Users");
const Posts = require("../models/Posts");
class PostController{
    async createPost(req,res){
        const post = req.body;
        const {createdBy, postdescription} = post;
        post['likecount']=0;
        console.log(post);
        if(postdescription != ''){
            try{
                const createdPost = await Posts.create(post);
                console.log('createdPosts: ',createdPost)
                res.status(201).json(createdPost);
            }
            catch(error){
                return res.status(400).json({error:'unable to create post'})
            }

        }
        else{
            return res.status(400).json({error:'put something bahenchodddd..!!!'})
        }
        
    }

    async getAllPosts(req, res){
        try{ 
            const everyPost = await Posts.findAll({
                order: [['id', 'DESC']]
            });
            return res.json(everyPost)
        }
        catch(error){
            res.status(404).json({error:'Post not Found'})
        }
    }

    async deletePost(req,res){
        const postId = req.params.postId;
        const post = await Posts.findByPk(postId);
        if (!post){
            return res.status(404).json({error:'Post not found'})
        }
        else{
            await post.destroy()
            res.status(204).send();
        }
    }

    async updatePost(req, res){
        const updatedPost = req.body;
        const post = await Posts.findByPk(updatedPost.id);
        if (!post){
            return res.status(404).json({error:'Post not found'})
        }
        else{
            post.postdescription = updatedPost.postdescription;
            await post.save();
            return res.json(post);
        }
    }
}
module.exports = new PostController();