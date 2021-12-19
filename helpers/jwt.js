const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: "30d"
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el Json Web Token - JWT");
				}
				resolve(token);
			}
		);
	});
};

module.exports = {
	generateJWT
};
