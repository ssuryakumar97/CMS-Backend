const Post = require('../models/post.module');


module.exports.createPost = async(req, res) => {
try {
    const post =  await new Post(req.body);
    post.save();
    return res.status(200).json('Post saved successfully');
} catch (err) {
    return res.status(500).json(err);
}
    
}

module.exports.getAllPosts = async (req, res) => {
    let category = req.query.category;
    let posts;
    try{
        if (category) {
            posts = await Post.find({ categories: category});
        } else {
            posts = await Post.find({});
        }
        

        return res.status(200).json(posts);
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

module.exports.getPost = async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    }catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports.updatePost = async (req, res) => {
    try{
        const post= await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({msg: 'post not found'});
        }
        await Post.findByIdAndUpdate(req.params.id, {$set: req.body})

        return res.status(200).json({msg: 'Post updated successfully'})
    } catch(err) {
        return res.status(500).json({err: err.message})
    }
}

module.exports.deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json ({ msg: 'post not found'});
        }

        await post.delete();

        return res.status(200).json({msg: 'post deleted successfully'});
    } catch(err) {
        return res.status(500).json({err : err.message});
    }
}