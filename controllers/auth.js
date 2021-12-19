const { response } = require("express");
var bcrypt = require("bcryptjs");

// const { validationResult } = require("express-validator");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		// Validar los campos en correlacion a la BD
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({
				ok: false,
				msg: "Ya existe un usuario con ese correo"
			});
		}
		user = new User(req.body);

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save(); // <- Guarda en la Base de datos

		// Generar JWT - Json Web Token
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Por favor hable con el administrador de la Base de datos"
		});
	}
};

const loginUsuario = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			// <- Si el usuario no existe
			return res.status(400).json({
				ok: false,
				msg: "El usuario no existe con ese email"
			});
		}

		//Comprobar contraseñas
		const isValidPass = bcrypt.compareSync(password, user.password);

		if (!isValidPass) {
			return res.status(400).json({
				ok: false,
				msg: "La contraseña no es correcta"
			});
		}

		//Generar JWT - Json Web Token
		const token = await generateJWT(user.id, user.name);

		// Damos una respuesta valida
		res.status(200).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Por favor hable con el administrador de la Base de datos"
		});
	}
};

const revalidarToken = async (req, res = response) => {
	const { uid, name } = req;
	const token = await generateJWT(uid, name);

	res.json({
		ok: true,
		token
	});
};

module.exports = { crearUsuario, loginUsuario, revalidarToken };

// name,

// if (name.length < 3) {
// 	return res.status(400).json({
// 		ok: false,
// 		msg: "El nombre tiene que tener más de 2 letras"
// 	});
// }

//Manejo de Errores
/* !areThereErrors(req, res) && */
// user: req.body
// msg: "registro",
// name,
// email,
// password

// res.json({
// 	ok: true,
// 	msg: "login",
// 	email,
// 	password
// });

//Metodo propio para comprobar si hay errores sin tener que copiar el codigo cada vez
// const areThereErrors = (req, res) => {
// 	const errors = validationResult(req);
// 	if (!errors.isEmpty()) {
// 		res.status(400).json({
// 			ok: false,
// 			errors: errors.mapped()
// 		});
// 		return true;
// 	} else return false;
// };
