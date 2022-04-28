#! /usr/bin/env python3

import RPi.GPIO as GPIO
from time import sleep

class Motor:
    def __init__(self):
        # left front
        en = 22
        in1 = 27
        in2 = 17
        # left back
        en2 = 2
        in21 = 4
        in22 = 3

        # right front
        en3 = 10
        in31 = 11
        in32 = 9
        # right back
        en4 = 6
        in41 = 0
        in42 = 5

        # direction
        temp1 = 1

        GPIO.setmode(GPIO.BCM)
        self.start_up(in1, in2, en)
        self.start_up(in21, in22, en2)
        self.start_up(in31, in32, en3)
        self.start_up(in41, in42, en4)

        self.p = GPIO.PWM(en, 1000)
        self.p.start(25)

        self.p2 = GPIO.PWM(en2, 1000)
        self.p2.start(25)

        self.p3 = GPIO.PWM(en3, 1000)
        self.p3.start(25)

        self.p4 = GPIO.PWM(en4, 1000)
        self.p4.start(25)

        self.left_front = [in1, in2]
        self.left_back = [in21, in22]
        self.right_front = [in31, in32]
        self.right_back = [in41, in42]

    def start_up(self, in_1, in_2, en_1):
        GPIO.setup(in_1, GPIO.OUT)
        GPIO.setup(in_2, GPIO.OUT)
        GPIO.setup(en_1, GPIO.OUT)
        GPIO.output(in_1, GPIO.LOW)
        GPIO.output(in_2, GPIO.LOW)

    def run_motor(self, portion, direction):
        if direction == 1:
            GPIO.output(portion[0], GPIO.HIGH)
            GPIO.output(portion[1], GPIO.LOW)
        elif direction == 0:
            GPIO.output(portion[0], GPIO.LOW)
            GPIO.output(portion[1], GPIO.HIGH)

    def stop_motor(self, portion):
        GPIO.output(portion[0], GPIO.LOW)
        GPIO.output(portion[1], GPIO.LOW)

    def forward(self):
        print("forward")
        self.run_motor(self.left_back, 1)
        self.run_motor(self.right_back, 1)
        self.run_motor(self.left_front, 1)
        self.run_motor(self.right_front, 1)

    def stop(self):
        print("stop")
        self.stop_motor(self.left_back)
        self.stop_motor(self.right_back)
        self.stop_motor(self.left_front)
        self.stop_motor(self.right_front)  

    def backwards(self):
        print("backward")
        self.run_motor(self.left_back, 0)
        self.run_motor(self.right_back, 0)
        self.run_motor(self.left_front, 0)
        self.run_motor(self.right_front, 0)

    def low_power(self):
        print("low")
        self.p.ChangeDutyCycle(25)
        self.p2.ChangeDutyCycle(25)  
        self.p3.ChangeDutyCycle(25)
        self.p4.ChangeDutyCycle(25)

    def medium_power(self):
        print("medium")
        self.p.ChangeDutyCycle(50)
        self.p2.ChangeDutyCycle(50)
        self.p3.ChangeDutyCycle(50)
        self.p4.ChangeDutyCycle(50)

    def high_power(self):
        print("high")
        self.p.ChangeDutyCycle(75)
        self.p2.ChangeDutyCycle(75)
        self.p3.ChangeDutyCycle(75)
        self.p4.ChangeDutyCycle(75)