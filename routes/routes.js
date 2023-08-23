const express = require('express');
const pictureController = require('../controllers/pictureController');
const upload = require('../config/multer.js');

const routes = (app) => {
	app.use('/images', express.static("./uploads"));

	app.get('/busca', pictureController.encontrarFotoPorFiltro);
	app.get('/', pictureController.encontrarTodasAsFotos);
	app.get('/:id', pictureController.encontrarFotoPorId);
	app.post('/', upload.single('file'), pictureController.criarFoto);
	app.delete('/:id', pictureController.excluirFotoPorId);
}

module.exports = routes;