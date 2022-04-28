var util = require('util');
var events = require('events');
var bleno = require('bleno');

//a new Service NumberService with our newly generated UUID, with one Characteristic 
//NumberCharacteristic with a derived UUID, and the same Descriptors as we used for 
//the Device Information Service
var NumberCharacteristic = function(deviceState) {
    bleno.Characteristic.call(this, {
        uuid: '7a4b0001-999f-4717-b63a-066e06971f59',
        properties: ['read', 'write'],
        descriptors: [
            new bleno.Descriptor({
               uuid: '2901',
               value: 'Some Number'
            }),
            new bleno.Descriptor({
               uuid: '2904',
               value: new Buffer.from([0x04, 0x00, 0x27, 0x00, 0x01, 0x00, 0x00])
            }),
        ],
    }
    )

    this.deviceState = deviceState;

}

util.inherits(NumberCharacteristic, bleno.Characteristic);

NumberCharacteristic.prototype.onReadRequest = function(offset, callback) {
    console.log('onReadRequest');
    if(offset) {
        callback(this.RESULT_ATTR_NOT_LONG, null);
    } 
    else {
        var data = new Buffer.alloc(1);
        data.writeUInt8(this.deviceState.value);
        console.log('onReadRequest returning ', data);
        callback(this.RESULT_SUCCESS, data);
        // to cause the value to change, we will create a side-effect here
        this.deviceState.value = (this.deviceState.value + 1) % 256;
    }
}

NumberCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    if(offset) {
        callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 1) {
        callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
        var new_value = data.readUInt8(0);
        this.deviceState.set_value(new_value);
        callback(this.RESULT_SUCCESS);
    }
};

function NumberService(deviceState) {
    bleno.PrimaryService.call(this, {
        uuid: '7a4bbfe6-999f-4717-b63a-066e06971f59',
        characteristics: [
            new NumberCharacteristic(deviceState),
        ]
    });
}

util.inherits(NumberService, bleno.PrimaryService);

module.exports = NumberService;