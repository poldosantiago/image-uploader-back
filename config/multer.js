const multer = require('multer');
const path = require('path');

console.log(path.join(__dirname, '/uploads/'))

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// cb(null, './uploads/')
		cb(null, path.join(__dirname, '/uploads/'))
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	}
});

const upload =  multer({ storage });

module.exports = upload;