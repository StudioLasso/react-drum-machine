"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = URL.createObjectURL(new Blob(['(', function () {
	var timerID = null;
	var interval = 100;

	self.onmessage = function (e) {
		if (e.data == "start") {
			timerID = setInterval(function () {
				postMessage("tick");
			}, interval);
		} else if (e.data == "stop") {
			clearInterval(timerID);
			timerID = null;
		}
	};
}.toString(), ')()'], { type: 'application/javascript' }));
module.exports = exports["default"];