const Picture = require('../models/Picture');
const fs = require('fs');

const encontrarTodasAsFotos = async (req,  res) => {
	try{
		const pictures = await Picture.find();

		res.status(200).json(pictures);
	}catch(erro){
		res.status(500).json({mensagem: "Erro ao ler imagens"});
	}
}

const encontrarFotoPorId = async (req,  res) => {
	try{
		const { id } = req.params;
		const picture = await Picture.findById(id);

		if(!picture){
			res.status(404).json({mensagem: `id de imagem não encontrado`});
		}

		res.status(200).json(picture);
	}catch(erro){
		res.status(500).json({mensagem: "Erro ao ler imagem"});
	}
}

const encontrarFotoPorFiltro = async (req,  res) => {
	try{
		const { filename } = req.query;

		const busca = {}
		if(filename){
			busca.filename = filename;
		}
		
		const picture = await Picture.find(busca);

		if(!picture || picture.length === 0){
			res.status(404).json({mensagem: `imagem não encontrada`});
		}

		res.status(200).json(picture);
	}catch(erro){
		res.status(500).json({mensagem: "Erro ao ler imagem"});
	}
}

const criarFoto = async (req, res) => {
	try {
		const { nome } = req.body;

		const file = req.file;
		const dominio = req.hostname === 'localhost'
			?`${req.hostname}:${process.env.PORT}`
			:req.filename; 

		const picture = new Picture({
			nome,
			src: file.path,
			url: `http://${dominio}/images/${file.filename}`,
			filename: file.filename
		})
		
		await picture.save();

		res.status(201).json({mensagem: "Imagem salva com sucesso!"});

	} catch(erro) {
		res.status(500).json({mensagem: "Erro ao salvar imagem"});
	}
};

const excluirFotoPorId = async (req,  res) => {
	try{
		const { id } = req.params;
		const picture = await Picture.findById(id);

		if(!picture){
			res.status(404).json({mensagem: `id de imagem não encontrado`});
		}

		fs.unlinkSync(picture.src);
		
		await picture.deleteOne();

		res.status(200).json({mensagem: "Imagem excluida com sucesso!"});
	}catch(erro){
		console.log(erro);
		res.status(500).json({mensagem: "Erro ao excluir imagem"});
	}
}

const pictureController = {
	criarFoto,
	encontrarTodasAsFotos,
	encontrarFotoPorId,
	encontrarFotoPorFiltro,
	excluirFotoPorId
}

module.exports = pictureController;