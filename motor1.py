#! /usr/bin/env python3

import RPi.GPIO as GPIO
from time import sleep

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


def start_up(in_1, in_2, en_1):
    GPIO.setup(in_1, GPIO.OUT)
    GPIO.setup(in_2, GPIO.OUT)
    GPIO.setup(en_1, GPIO.OUT)
    GPIO.output(in_1, GPIO.LOW)
    GPIO.output(in_2, GPIO.LOW)


GPIO.setmode(GPIO.BCM)
start_up(in1, in2, en)
start_up(in21, in22, en2)
start_up(in31, in32, en3)
start_up(in41, in42, en4)

p = GPIO.PWM(en, 1000)
p.start(25)

p2 = GPIO.PWM(en2, 1000)
p2.start(25)

p3 = GPIO.PWM(en3, 1000)
p3.start(25)

p4 = GPIO.PWM(en4, 1000)
p4.start(25)

print("\n")
print("The default speed & direction of motor is LOW & Forward.....")
print("r-run s-stop f-forward b-backward l-low m-medium h-high e-exit")
print("\n")

left_front = [in1, in2]
left_back = [in21, in22]
right_front = [in31, in32]
right_back = [in41, in42]


def run_motor(portion, direction):
    if direction == 1:
        GPIO.output(portion[0], GPIO.HIGH)
        GPIO.output(portion[1], GPIO.LOW)
    elif direction == 0:
        GPIO.output(portion[0], GPIO.LOW)
        GPIO.output(portion[1], GPIO.HIGH)


def stop_motor(portion):
    GPIO.output(portion[0], GPIO.LOW)
    GPIO.output(portion[1], GPIO.LOW)


while 1:

    x = input()

    if x == 's':
        print("stop")
        stop_motor(left_back)
        stop_motor(right_back)
        stop_motor(left_front)
        stop_motor(right_front)
        x = 'z'

    elif x == 'f':
        print("forward")
        run_motor(left_back, 1)
        run_motor(right_back, 1)
        run_motor(left_front, 1)
        run_motor(right_front, 1)
        x = 'z'

    elif x == 'b':
        print("backward")
        run_motor(left_back, 0)
        run_motor(right_back, 0)
        run_motor(left_front, 0)
        run_motor(right_front, 0)
        x = 'z'

    elif x == 'l':
        print("backward")
        p.ChangeDutyCycle(25)
        p2.ChangeDutyCycle(25)
        p3.ChangeDutyCycle(50)
        p4.ChangeDutyCycle(50)
        x = 'z'

    elif x == 'r':
        print("backward")
        p.ChangeDutyCycle(50)
        p2.ChangeDutyCycle(50)
        p3.ChangeDutyCycle(25)
        p4.ChangeDutyCycle(25)
        x = 'z'

    elif x == 'p1':
        print("low")
        p.ChangeDutyCycle(25)
        p2.ChangeDutyCycle(25)
        p3.ChangeDutyCycle(25)
        p4.ChangeDutyCycle(25)
        x = 'z'

    elif x == 'p2':
        print("medium")
        p.ChangeDutyCycle(50)
        p2.ChangeDutyCycle(50)
        p3.ChangeDutyCycle(50)
        p4.ChangeDutyCycle(50)
        x = 'z'

    elif x == 'p3':
        print("high")
        p.ChangeDutyCycle(75)
        p2.ChangeDutyCycle(75)
        p3.ChangeDutyCycle(75)
        p4.ChangeDutyCycle(75)
        x = 'z'

    elif x == 'e':
        GPIO.cleanup()
        break

    else:
        print("<<<  wrong data  >>>")
        print("please enter the defined data to continue.....")