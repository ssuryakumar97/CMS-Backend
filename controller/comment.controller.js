const  Comment = require( '../models/comment.module')



module.exports.newComment = async (req, res) => {
    try{
        const comment = await new Comment(req.body);
        comment.save();
        res.status(200).json({ msg: 'Comment saved successfully'});
    } catch (err) {
        res.status(500).json({err: err.message});
    }
}

module.exports.getComments = async (req,res) => {
    try{
        const comments = await Comment.find ({ postId: req.params.id});
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({err: err.message})
    }

}

module.exports.deleteComment = async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        await comment.delete();

        res.status(200).json({msg:"Comment deleted successfully"})
    } catch(err) {
        res.status(500).json({err: err.message})
    }
}