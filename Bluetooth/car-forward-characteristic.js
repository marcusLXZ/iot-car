var util = require('util');
var bleno = require('bleno');

var CHARACTERISTIC_NAME = 'Forward';

var ForwardCharacteristic = function(carState) {
  ForwardCharacteristic.super_.call(this, {
    uuid: '0002A7D3-D8A4-4FEA-8174-1736E808C066',
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

//   this._update = null;

//   this.changed_onoff = function(is_on) {
//     console.log('carState changed CarForwardCharacteristic');
//     if( this._update !== null ) {
//         console.log('this._update is ', typeof(this._update));
//         console.log('updating new Forward uuid=', this.uuid);
//         var data = new Buffer(1);
//         if (is_on) {
//             data.writeUInt8(0x01, 0);
//         } else {
//             data.writeUInt8(0x0, 0);
//         }
//         this._update(data);
//     }
//   }

//   this.carState = carState;

//   this.carState.on('changed-onoff', this.changed_onoff.bind(this));

}

util.inherits(ForwardCharacteristic, bleno.Characteristic);

ForwardCharacteristic.prototype.onReadRequest = function(offset, callback) {
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

ForwardCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    if(offset) {
        callback(this.RESULT_ATTR_NOT_LONG);
    }
    else if (data.length !== 1) {
        callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
    }
    else {
        var new_onoff = data.readUInt8(0);
        this.carState.forward( new_onoff === 0x1);
        callback(this.RESULT_SUCCESS);
    }
};

ForwardCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log('subscribe on ', CHARACTERISTIC_NAME);
    this._update = updateValueCallback;
}

ForwardCharacteristic.prototype.onUnsubscribe = function() {
    console.log('unsubscribe on ', CHARACTERISTIC_NAME);
    this._update = null;
}

module.exports = ForwardCharacteristic;

