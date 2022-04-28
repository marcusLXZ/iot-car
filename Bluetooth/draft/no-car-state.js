var events = require('events');
var util = require('util');
var mqtt = require('mqtt');

function CarState() {
    events.EventEmitter.call(this);

    this.is_on = true;

    var that = this;

    mqtt_client = mqtt.connect('mqtt://localhost');
    mqtt_client.on('connect', function() {
        console.log('connected!');
    });

    mqtt_client.on('message', function(topic, message) {
        new_state = JSON.parse(message);
        console.log('NEW STATE: ', new_state);
        var new_onoff = new_state['on'];
        var new_brightness = Math.round(new_state['brightness']*0xFF);
        var new_hue = Math.round(new_state['color']['h']*0xFF);
        var new_saturation = Math.round(new_state['color']['s']*0xFF);
        if (that.is_on !== new_onoff) {
            console.log('MQTT - NEW ON/OFF');
            that.is_on = new_state['on'];
            that.emit('changed-onoff', that.is_on);
        }

    });

    this.mqtt_client = mqtt_client;
    
}

util.inherits(CarState, events.EventEmitter);

CarState.prototype.set_onoff = function(is_on) {
    this.is_on = is_on;
    var tmp = {'on': this.is_on };
    this.mqtt_client.publish('/car', JSON.stringify(tmp));
    console.log('is_on = ', this.is_on);
};


module.exports = LampiState;