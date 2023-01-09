const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User= require('../models/user.module');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Token = require('../models/token.module');
const { uploadImage, getImage } = require('../controller/image.controller');
const upload = require('../utils/upload');
const {createPost, getAllPosts, getPost, updatePost, deletePost } = require ('../controller/post.controller');
const { authenticateToken} = require ('../controller/jwt.controller')
const { newComment, getComments, deleteComment } = require('../controller/comment.controller');

dotenv.config();

router.post('/signUp', async(req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const payload = {username: req.body.username, emailId: req.body.emailId, password: hashedPassword};
        const newUser= new User(payload)
        newUser.save((err,data) => {
            if(err){
                return res.status(400).send({message : `${err} please check the data`})
            }
            res.status(201).send({message:`${data._id} data successfully added `});

        })
    } catch(err) {
        res.status(500).send({message : err})
    }
});

router.post('/login', async(req, res) => {
    let user = await User.findOne({username: req.body.username})
    if(!user){
        return res.status(400).send({message: 'Username does not exist'});
    }

    try {
       const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {
                expiresIn: '15m'
            })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return res.status(200).send({ accessToken: accessToken, refreshToken: refreshToken, username: user.username, emailId: user.emailId})
        } else {
            res.status(400).send({message: 'Password does not match'});
        }
    } catch (err) {
        return res.status(500).send({
            message: 'Error while login to the user'
        })
    }
})

router.post('/file/upload', upload.single('file'), uploadImage );
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken , createPost);
router.get('/posts',authenticateToken, getAllPosts);
router.get('/post/:id',authenticateToken, getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

module.exports = router;