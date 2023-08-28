const mongoose =  require('mongoose');
require('dotenv').config();

// mongoose.set('strictQuery', true);

const main = async () =>{
	await mongoose.connect(`mongodb+srv://${'poldosantiago'}:${'a0hofU7pNBijQpfc'}@cluster0.ommstnp.mongodb.net/?retryWrites=true&w=majority`);

	console.log('- banco conectado com Sucesso!')
}

main().catch(erro => console.log(erro));

module.exports = main;