const grid =require('gridfs-stream');
const mongoose = require('mongoose');


// const url = 'http://localhost:5000' ;
const url = "https://cms-backend-gy29.onrender.com";
// const url = 'https://papaya-tiramisu-fa9ec4.netlify.app';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs =grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
})

module.exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(404).send({msg: 'file not found'});
    }

    const imageUrl = `${url}/api/file/${req.file.filename}` ;

    return res.status(200).send(imageUrl);
}

module.exports.getImage = async(req, res) => {
try {
    const file = await gfs.files.findOne({filename: req.params.filename });
    console.log(req.params)
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
} catch(err) {
return res.status(500).json({ msg: err.message})
}

}