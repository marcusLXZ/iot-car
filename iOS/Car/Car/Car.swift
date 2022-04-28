//
//  Car.swift
//  BTLE-Demo
//

import Foundation
import CoreBluetooth

class Car: NSObject, ObservableObject {
    @Published var state: State = State() {
        didSet {
            //number is speed
            if state.number != oldValue.number,
               let numberCharacteristic = numberCharacteristic {

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [weak self] in
                    guard let self = self else { return }

                    var intToWrite = UInt8(self.state.number)
                    let dataToWrite = Data(bytes: &intToWrite, count: 1)
                    self.devicePeripheral?.writeValue(dataToWrite, for: numberCharacteristic, type: .withResponse)
                    print("Updated speed characteristic over bluetooth")
                }
            }
            
            if state.forward != oldValue.forward,
               let forwardCharacteristic = forwardCharacteristic {

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [weak self] in
                    guard let self = self else { return }
                    //send config to car
                    var intToWrite = UInt8(self.state.forward ? 1 : 0)
                    let dataToWrite = Data(bytes: &intToWrite, count: 1)
                    self.devicePeripheral?.writeValue(dataToWrite, for: forwardCharacteristic, type: .withResponse)
                    print("Updated forward characteristic over bluetooth")
                }
            }
            
            if state.stop != oldValue.stop,
               let stopCharacteristic = stopCharacteristic {

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [weak self] in
                    guard let self = self else { return }
                    //send config to car
                    var intToWrite = UInt8(self.state.stop ? 1 : 0)
                    let dataToWrite = Data(bytes: &intToWrite, count: 1)
                    self.devicePeripheral?.writeValue(dataToWrite, for: stopCharacteristic, type: .withResponse)
                    print("Updated stop characteristic over bluetooth")
                }
            }
            
            if state.backward != oldValue.backward,
               let backwardCharacteristic = backwardCharacteristic {

                DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) { [weak self] in
                    guard let self = self else { return }
                    //send config to car
                    var intToWrite = UInt8(self.state.backward ? 1 : 0)
                    let dataToWrite = Data(bytes: &intToWrite, count: 1)
                    self.devicePeripheral?.writeValue(dataToWrite, for: backwardCharacteristic, type: .withResponse)
                    print("Updated backward characteristic over bluetooth")
                }
            }
        }
    }

    private var bluetoothManager: CBCentralManager!
    private var devicePeripheral: CBPeripheral?
    private var numberCharacteristic: CBCharacteristic?
    private var stopCharacteristic: CBCharacteristic?
    private var forwardCharacteristic: CBCharacteristic?
    private var backwardCharacteristic: CBCharacteristic?


    override init() {
        super.init()
        bluetoothManager = CBCentralManager(delegate: self,
                                            queue: nil)
    }
}

extension Car {
    struct State: Equatable {
        var number: Double = 0.0
        var forward: Bool = false
        var stop: Bool = false
        var backward: Bool = false
        var isConnected: Bool = false
    }
}


extension Car: CBCentralManagerDelegate {
    private static let DEVICE_NAME = "Car 12345"
    private static let OUR_SERVICE_UUID = "7a4bbfe6-999f-4717-b63a-066e06971f59"
    

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == .poweredOn {
            let services = [CBUUID(string:Car.OUR_SERVICE_UUID)]
            bluetoothManager.scanForPeripherals(withServices: services)
        }
    }

    func centralManager(_ central: CBCentralManager,
                        didDiscover peripheral: CBPeripheral,
                        advertisementData: [String : Any],
                        rssi RSSI: NSNumber) {
        if peripheral.name == Car.DEVICE_NAME {
            print("Found \(Car.DEVICE_NAME)")

            devicePeripheral = peripheral

            bluetoothManager.stopScan()
            bluetoothManager.connect(peripheral)
        }
    }

    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        print("Connected to peripheral: \(peripheral)")
        state.isConnected = true

        peripheral.delegate = self
        peripheral.discoverServices([CBUUID(string:Car.OUR_SERVICE_UUID)])
    }

    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        print("Disconnected from peripheral: \(peripheral)")
        state.isConnected = false
    }
}

extension Car: CBPeripheralDelegate {
    static let SPEED_UUID = "0001A7D3-D8A4-4FEA-8174-1736E808C066"
    static let FORWARD_UUID = "0002A7D3-D8A4-4FEA-8174-1736E808C066"
    static let BACKWARD_UUID = "0003A7D3-D8A4-4FEA-8174-1736E808C066"
    static let STOP_UUID = "0004A7D3-D8A4-4FEA-8174-1736E808C066"

    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard let services = peripheral.services else { return }

        for service in services {
            print("Discovered device service")
            peripheral.discoverCharacteristics(nil, for: service)
        }
    }

    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        guard let characteristics = service.characteristics else { return }

        for characteristic in characteristics {
            if characteristic.uuid == CBUUID(string: Car.SPEED_UUID) {
                print("Found SPEED with UUID: \(Car.SPEED_UUID)")
                numberCharacteristic = characteristic
            }
            else if characteristic.uuid == CBUUID(string: Car.FORWARD_UUID) {
                print("Found FORWARD with UUID: \(Car.FORWARD_UUID)")
                forwardCharacteristic = characteristic
            }
            else if characteristic.uuid == CBUUID(string: Car.BACKWARD_UUID) {
                print("Found BACKWARD with UUID: \(Car.BACKWARD_UUID)")
                backwardCharacteristic = characteristic
            }
            else if characteristic.uuid == CBUUID(string: Car.STOP_UUID) {
                print("Found STOP with UUID: \(Car.STOP_UUID)")
                stopCharacteristic = characteristic
            }
        }
    }

}
