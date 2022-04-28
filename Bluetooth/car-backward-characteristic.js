var util = require('util');
var bleno = require('bleno');

var CHARACTERISTIC_NAME = 'Backward';

var BackwardCharacteristic = function(carState) {
  BackwardCharacteristic.super_.call(this, {
    uuid: '0003A7D3-D8A4-4FEA-8174-1736E808C066',
    properties: ['read', 'write', 'notify'],
    secure: [],
    descriptors: [
        new bleno.Descriptor({
            uuid: '2901',
            value: CHARACTERISTIC_NAME,
        }),
        new bleno.Descriptor({
           uuid: '2904',
           value: new Buffer([0x04, 0x00, 0x27, 0x00, 0x01, 0x00, 0x00])
        }),
    ],
  });
  this.carState = carState;
}

util.inherits(BackwardCharacteristic, bleno.Characteristic);

BackwardCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('onReadRequest');
  if (offset) {
    console.log('onReadRequest offset');
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = new Buffer(1);
    // if (this.carState.is_on) {
    //     data.writeUInt8(0x01, 0);
    // } else {
    data.writeUInt8(0x0, 0);
    // }
    console.log('onReadRequest returning ', data);
    callback(this.RESULT_SUCCESS, data);
  }
};

BackwardCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    if(offset) {
        callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 1) {
        callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
        var new_onoff = data.readUInt8(0);
        console.log(new_onoff)
        this.carState.backward(new_onoff === 0x1);
        callback(this.RESULT_SUCCESS);
    }
};

BackwardCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('subscribe on ', CHARACTERISTIC_NAME);
    this._update = updateValueCallback;
}

BackwardCharacteristic.prototype.onUnsubscribe = function() {
    console.log('unsubscribe on ', CHARACTERISTIC_NAME);
    this._update = null;
}

module.exports = BackwardCharacteristic;

