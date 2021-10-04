const PhotosRouter = require('express').Router()
const PhotosController = require('../controllers/photos')
const multer  = require('multer')

//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: (req, file, callback) =>{
        callback(null, '../uploads')
    },

    //add back the extension
filename: (req, file, callback) =>{
    callback(null, Date.now() + file.originalname)
}
})


//upload parametes for multer

const upload = multer ({
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 3
    }
})



PhotosRouter.post('/', upload.single('image'), PhotosController.create)
