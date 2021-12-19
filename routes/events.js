/* 
    Rutas de usuarios /Events
    host + /api/events
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const {
	getEvents,
	addEvent,
	getEvent,
	updateEvent,
	deleteEvent
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/jwtValidator");
const { validateFields } = require("../middlewares/fieldsValidator.js");
const { isDate, isBeforeOrEqual } = require("../helpers/dates");

//Validar todas las peticiones que esten debajo de este middleware
router.use(validateJWT);

router.get("/", getEvents);
router.post(
	"/",
	[
		check("title", "El título es obligatorio").not().isEmpty(),
		check("start", "La fecha de inicio es obligatoria").custom(isDate),
		check("end", "La fecha de finalización es obligatoria").custom(isDate),
		check(
			"start",
			"La fecha inicial debe ser anterior o igual a la fecha final"
		).custom(isBeforeOrEqual),
		validateFields
	],
	addEvent
);
router.get("/:id", getEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
