const mongoose = require("mongoose");

const dbConnection = async () => {
	try {
		// mongoose.connect("mongodb://localhost:27017/test");
		await mongoose.connect(
			process.env.DB_CNN
			// , {
			// 	useNewUrlParser: true,
			// 	useUnifiedTopology: true,
			// 	useCreateIndex: true
			// }
		);
		console.log("DB online");
	} catch (error) {
		throw new Error(
			`Error al inicializar Base de datos con el error: ${error}`
		);
	}
};

module.exports = { dbConnection };
