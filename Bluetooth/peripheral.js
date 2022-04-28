#! /usr/bin/env node
var child_process = require('child_process');
var device_id = 12345;
process.env['BLENO_DEVICE_NAME'] = 'Car ' + device_id;

var bleno = require('bleno');

var DeviceInfoService = require('./device-info-service');

var DeviceState = require('./car-state');
// var NumberService = require('./car-speed-characteristic');
var CarService = require('./car-service');


var deviceState = new DeviceState();

var deviceInfoService = new DeviceInfoService( 'CWRU', 'Car', '12345');
var carService = new CarService(deviceState);

deviceState.on('changed', function(new_value) {
    console.log('changed: ' + new_value);
});

// update the deviceState value every second
// call our function every 1000 ms and increment the value
// setInterval( function() {deviceState.set_value(deviceState.value +1)}, 1000);


bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising('MyService', [carService.uuid, deviceInfoService.uuid], function(err)  {
      if (err) {
        console.log(err);
      }
    });
  }
  else {
    bleno.stopAdvertising();
    console.log('not poweredOn');
  }
});

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...');
    //
    // Once we are advertising, it's time to set up our services,
    // along with our characteristics.
    //
    bleno.setServices([
        carService,
        deviceInfoService,
    ]);
  }
});