#Libraries
import RPi.GPIO as GPIO
import time
 
class Ultrasonic:
   def __init__(self):
      #GPIO Mode (BOARD / BCM)
      GPIO.setmode(GPIO.BCM)
      
      #set GPIO Pins
      self.TRIG = 19
      self.ECHO = 13

      GPIO.setup(self.TRIG,GPIO.OUT)
      GPIO.setup(self.ECHO,GPIO.IN)

      GPIO.output(self.TRIG, False)
   
   def get_distance(self):
      GPIO.output(self.TRIG, True)
      time.sleep(0.00001)
      GPIO.output(self.TRIG, False)

      start = time.time()

      pulse_start = time.time()

      while GPIO.input(self.ECHO)==0:
         pulse_start = time.time()
         if (pulse_start - start > .01):
            break

      pulse_end = time.time()

      while GPIO.input(self.ECHO)==1:
         pulse_end = time.time()
         if (pulse_end - pulse_start > .01):
            break

      pulse_duration = pulse_end - pulse_start

      distance = pulse_duration * 17150

      distance = round(distance, 2)
  
      return distance
