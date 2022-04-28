var util = require('util');
var events = require('events');
var mqtt = require('mqtt');


mqtt_client = mqtt.connect('mqtt://localhost');
mqtt_client.on('connect', function() {
    console.log('connected!');
});

mqtt_client.publish('/car', JSON.stringify('backward'));


// function DeviceState() {
//     events.EventEmitter.call(this);

//     mqtt_client = mqtt.connect('mqtt://localhost');
//     mqtt_client.on('connect', function() {
//         console.log('connected!');
//     });

//     this.mqtt_client = mqtt_client;
// }

// util.inherits(DeviceState, events.EventEmitter);

// DeviceState.prototype.forward = function(new_value) {
//     if (new_value === 1) {
//         this.mqtt_client.publish('/car', JSON.stringify('forward'));
//         //If the value has been updated, any callbacks registered for  
//         //the 'changed' event will be invoked and passed the new value
//         this.emit('changed', 'forward');
//     }
// };

// DeviceState.prototype.backward = function(new_value) {
//     if (new_value === 1) {
//         this.mqtt_client.publish('/car', JSON.stringify('backward'));
//         //If the value has been updated, any callbacks registered for  
//         //the 'changed' event will be invoked and passed the new value
//         this.emit('changed', 'backward');
//     }
// };

// DeviceState.prototype.stop = function(new_value) {
//     if (new_value === 1) {
//         this.mqtt_client.publish('/car', JSON.stringify('stop'));
//         //If the value has been updated, any callbacks registered for  
//         //the 'changed' event will be invoked and passed the new value
//         this.emit('changed', 'stop');
//     }
// };

// DeviceState.prototype.set_speed = function(new_value) {
//     if (new_value === 1) {
//         console.log('speed: ' + new_value)
//         this.mqtt_client.publish('/car', JSON.stringify(new_value));
//         //If the value has been updated, any callbacks registered for  
//         //the 'changed' event will be invoked and passed the new value
//         this.emit('changed', 'forward');
//     }
// };

// module.exports = DeviceState;