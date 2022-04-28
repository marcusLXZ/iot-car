var util = require('util');
var events = require('events');
var mqtt = require('mqtt');

function CarState() {
    events.EventEmitter.call(this);
    // this.forward = false;

    mqtt_client = mqtt.connect('mqtt://localhost');
    mqtt_client.on('connect', function() {
        console.log('connected!');
    });

    this.mqtt_client = mqtt_client;
}

util.inherits(CarState, events.EventEmitter);

CarState.prototype.forward = function(new_value) {
    if (new_value) {
        
        this.mqtt_client.publish('/car', JSON.stringify('forward'));
        //If the value has been updated, any callbacks registered for  
        //the 'changed' event will be invoked and passed the new value
        this.emit('changed', 'forward');
    }
};

CarState.prototype.backward = function(new_value) {
    if (new_value) {
        this.mqtt_client.publish('/car', JSON.stringify('backward'));
        this.emit('changed', 'backward');
    }
};

CarState.prototype.stop = function(new_value) {
    if (new_value) {
        this.mqtt_client.publish('/car', JSON.stringify('stop'));
        this.emit('changed', 'stop');
    }
};

CarState.prototype.set_speed = function(new_value) {
    if (new_value >=1 && new_value <=3) {
        this.mqtt_client.publish('/car', JSON.stringify(new_value));
        this.emit('changed', 'speed');
    }
};

module.exports = CarState;