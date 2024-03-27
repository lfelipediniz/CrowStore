const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "../public/CrowStore/imgs")
    },
    filename: function(req, file, cb){
        cb(null, req.body.name + path.extname(file.originalname));
    },
});


const upload = multer({ storage });

module.exports = upload;