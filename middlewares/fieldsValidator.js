const { response } = require("express");
const { validationResult } = require("express-validator");

const validateFields = (req, res = response, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			// msg: 'Ha habido un error al validar los campos',
			errors: errors.mapped()
		});
	}
	next();
};

module.exports = {
	validateFields
};
