#! /usr/bin/env python3

import paho.mqtt.client as mqtt
import motor
import time
import json
import ultrasonic

class CarService:
    def __init__(self):
        self.client = mqtt.Client()
        self.client.connect('localhost', keepalive=60)
        self.client.on_connect = self.on_connect
        print("connected")
        self.client.on_message = self.message_received

        self.Motor = motor.Motor()
        self.ultra = ultrasonic.Ultrasonic()

        self.crash = False

        self.prev_distance = 0
        self.distance = 0

        self.car_state = 's'

    def on_connect(self, client, userdata, rc, unknown):
        self.client.subscribe("/car")
        time.sleep(.05)

    def message_received(self, client, userdata, msg):
        message = json.loads(msg.payload.decode('utf-8'))
        message = str(message)
        print(message)

        if "forward" in message and not self.crash:
            self.Motor.forward()
            self.car_state = 'f'
        elif "backward" in message:
            self.Motor.backwards()
            self.car_state = 'b'
        elif "stop" in message:
            self.Motor.stop()
            self.car_state = 's'
        elif "1" in message:
            self.Motor.low_power()
        elif "2" in message:
            self.Motor.medium_power()
        elif "3" in message:
            self.Motor.high_power()

    def serve(self):
        while(1):
            self.client.loop_start()
            self.check_distance()

    def check_distance(self):
        self.prev_distance = self.distance
        self.distance = self.ultra.get_distance()

        if (self.distance < 10) and (self.prev_distance < 10) :
            self.crash = True
            if self.car_state == 'f':
                self.Motor.stop()
        else:
            self.crash = False


if __name__ == "__main__":
    CarService().serve()
