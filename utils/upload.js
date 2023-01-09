const multer  = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage'); //used to upload file in mongodb
const dotenv = require('dotenv'); //used to config the dotenv file


dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGO_URL,
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];
        console.log(match.indexOf(file.mimetype));
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
})

module.exports = multer({storage});