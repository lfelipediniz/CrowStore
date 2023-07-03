const multer = require("multer")
const path = require("path")

// Destination to store the images
const imageStore = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = req.baseUrl.includes("users") ? "users" : "products";

        cb(null, `public/images/${folder}`)
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Apenas .png ou .jpg são formatos de imagem válidos"))
        }
        cb(undefined, true)
    },
})

module.exports = { imageUpload }
