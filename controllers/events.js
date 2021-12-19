const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
	try {
		const events = await Event.find().populate("user", "name email");

		res.status(200).json({
			ok: true,
			events
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador"
		});
	}
};
const addEvent = async (req, res = response) => {
	//verificar que tenga el evento
	const event = new Event(req.body);

	try {
		event.user = req.uid;

		const savedEvent = await event.save();
		res.status(200).json({
			ok: true,
			event: savedEvent
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador"
		});
	}
};
const getEvent = async (req, res = response) => {
	try {
		const event = await Event.find({ _id: req.params.id }).populate(
			"user",
			"name email"
		);

		event
			? res.status(200).json({
					ok: true,
					event
			  })
			: res.status(404).json({
					ok: false,
					msg: "No hay un evento con ese Id"
			  });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador"
		});
	}
};

const updateEvent = async (req, res = response) => {
	try {
		const eventId = req.params.id;
		const uid = req.uid;
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: "No hay un evento con ese Id"
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "El usuario de la petición no tiene permiso para editar el evento"
			});
		}

		const newEvent = {
			...req.body,
			user: uid
		};

		const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true
		});

		res.status(200).json({
			ok: true,
			event: eventUpdated,
			msg: `El evento con el Id '${eventUpdated._id}' ha sido correctamente actualizado'`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador"
		});
	}
};

const deleteEvent = async (req, res = response) => {
	try {
		const eventId = req.params.id;
		const uid = req.uid;
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: "No hay un evento con ese Id"
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: "El usuario de la petición no tiene permiso para eliminar el evento"
			});
		}

		const eventDeleted = await Event.findByIdAndDelete(eventId, {
			new: true
		});

		res.status(200).json({
			ok: true,
			msg: `El evento con el Id '${eventDeleted._id}' ha sido correctamente eliminado'`,
			event_deleted: eventDeleted
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Hable con el administrador"
		});
	}
};

module.exports = {
	getEvents,
	addEvent,
	getEvent,
	updateEvent,
	deleteEvent
};
