var util = require('util');
var events = require('events');
var bleno = require('bleno');

var ForwardCharacteristic = require('./car-forward-characteristic');
var BackwardCharacteristic = require('./car-backward-characteristic');
var StopCharacteristic = require('./car-stop-characteristic');
var SpeedCharacteristic = require('./car-speed-characteristic');


function CarService(deviceState) {
    bleno.PrimaryService.call(this, {
        uuid: '7a4bbfe6-999f-4717-b63a-066e06971f59',
        characteristics: [
            new SpeedCharacteristic(deviceState),
            new ForwardCharacteristic(deviceState),
            new BackwardCharacteristic(deviceState),
            new StopCharacteristic(deviceState),
        ]
    });
}

util.inherits(CarService, bleno.PrimaryService);

module.exports = CarService;