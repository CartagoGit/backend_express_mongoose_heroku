const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
	//x-token-jwt <- Header, X por ser un header personalizado, y el resto el nombre que queramos darle
	const tokenJWT = req.header("x-token-jwt");

	if (!tokenJWT) {
		return res.status(401).json({
			ok: false,
			msg: "No hay token en la petición"
		});
	}

	try {
		const { uid, name } = jwt.verify(tokenJWT, process.env.SECRET_JWT_SEED);
		req.uid = uid;
		req.name = name;
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "Token no válido"
		});
	}

	next();
};

module.exports = { validateJWT };
