const Photos = require('../models/Photos')



const create = (req, res, next) => {
 
    const obj = {
        name: req.body.name,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    Photos.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
}



module.exports = create;
