const moment = require("moment");

const isDate = (value) => {
	if (!value) return false;
	const date = moment(value);
	return date.isValid() ? true : false;
};

const isBeforeOrEqual = (start, { req }) => {
	const datesToCompare = converterUnix(start, req.body.end);
	return datesToCompare[0] <= datesToCompare[1] ? true : false;
};
const isAfterOrEqual = (start, { req }) => {
	const datesToCompare = converterUnix(start, req.body.end);
	return datesToCompare[0] >= datesToCompare[1] ? true : false;
};
const isBefore = (start, { req }) => {
	const datesToCompare = converterUnix(start, req.body.end);
	return datesToCompare[0] < datesToCompare[1] ? true : false;
};
const isAfter = (start, { req }) => {
	const datesToCompare = converterUnix(start, req.body.end);
	return datesToCompare[0] > datesToCompare[1] ? true : false;
};

const converterUnix = (start, end) => {
	const unixStart = moment(start).unix();
	const unixEnd = moment(end).unix();
	return [unixStart, unixEnd];
};

module.exports = {
	isDate,
	isBeforeOrEqual,
	isAfterOrEqual,
	isBefore,
	isAfter,
	converterUnix
};
