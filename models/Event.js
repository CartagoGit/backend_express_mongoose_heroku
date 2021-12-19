const { Schema, model } = require("mongoose");

const EventSchema = Schema({
	title: { type: String, required: true },
	notes: { type: String },
	start: { type: Date, required: true },
	end: { type: Date, required: true },
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: "true"
	}
});

//Para remplazar que en vez de poner _id y __v como la version; quitando la version y dejando el id sin barra baja
EventSchema.method("toJSON", function () {
	//Esto es solo a la hora de verlo, no se hace modificacion en la base de datos
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model("Event", EventSchema);
