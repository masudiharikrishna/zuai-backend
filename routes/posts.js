const express = require("express")
const Post = require("../models/post")
const router = express.Router()


//get all available posts by using get method
router.get('/', async(request, response)=>{
    try{
        const posts = await Post.find()
        response.json(posts)
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
})

//get specific posts by using get method
router.get('/:id', async(request, response)=>{
    try{
        const post = await Post.findById(request.params.id);
        if(!post) return response.status(404).json({message: "Post not found"});
        response.json(post)
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
})

// create new post by using post method
router.post('/', async(request, response)=>{
    const {title, image, extract, content} = request.body;
    const newPost = new Post({title, image, extract, content})
    try{
        const savedPost = await newPost.save();
        response.status(201).json(savedPost)
    }
    catch(error){
        response.status(400).json({message: error.message})
    }
})

// update the specific post by using update method
router.put('/:id', async(request, response)=>{
    const {title, extract, image, content} = request.body;
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            request.params.id,
            {title, extract, image, content},
            {new : true}
        )
        if(!updatedPost) return response.status(404).json({message: "post not found"});
        response.json(updatedPost)
    }
    catch(error){
        response.status(500).json({message: error.message});
    }
})

// delete the specific post by using delete method
router.delete('/:id', async(request, response)=>{
    try{
        const deletePost = await Post.findByIdAndDelete(request.params.id)
        if (!deletePost) return response.status(404).json({message: "post not found"})
        response.json({message: "post deleted successfully"})
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
})

module.exports = router