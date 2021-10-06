// const PhotosRouter = require('express').Router()
// const PhotosController = require('../controllers/photos')
// const multer = require('multer')
// const passport = require('passport')

// //define storage for the images
// const storage = multer.diskStorage({
//   //destination for files
//   destination: (req, file, callback) => {
//     callback(null, '../uploads')
//   },

//   //add back the extension
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + file.originalname)
//   },
// })

// //upload parametes for multer

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 3,
//   },
// })

// PhotosRouter.post(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   upload.single('image'),
//   PhotosController.create
// )

const upload = require("../middleware/upload");
const express = require("express");
const PhotosRouter = express.Router();

PhotosRouter.post("/upload", upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:3001/file/${req.file.filename}`;
    return res.send(imgUrl);
});

PhotosRouter.get("/file/:filename", async (req, res) => {
  try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
  } catch (error) {
      res.send("not found");
  }
});

PhotosRouter.delete("/file/:filename", async (req, res) => {
  try {
      await gfs.files.deleteOne({ filename: req.params.filename });
      res.send("success");
  } catch (error) {
      console.log(error);
      res.send("An error occured.");
  }
});

module.exports = PhotosRouter;
