import RPi.GPIO as GPIO
import time
import asyncio

TRIG = 23
ECHO = 24

def sonar_init():
    print ("Sonar init start")
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(TRIG, GPIO.OUT)
    GPIO.setup(ECHO, GPIO.IN)

    GPIO.output(TRIG, False)
    print ("Sonar init wait")
    time.sleep(2)
    print ("Sonar init done")


async def sonar_sample():
    #print ("sonar_sample")
    sum_distance = 0
    sample_count = 10
    sample_seconds = 1.0
    pulse_start = 0
    pulse_end = 0

    for i in range(sample_count):
        #print(11111111)
        GPIO.output(TRIG, True)
        time.sleep(0.00001)
        GPIO.output(TRIG, False)
        #print(22222222)
        loop_time = time.time()
        while GPIO.input(ECHO) == 0:
            pulse_start = time.time()
            if pulse_start - loop_time > 1:
                return 0
        #print(22223333)
        loop_time = time.time()
        while GPIO.input(ECHO) == 1:
            pulse_end = time.time()
            if pulse_end - loop_time > 1:
                return 0
        #print(33333333)
        pulse_duration = pulse_end - pulse_start
        distance = round(pulse_duration * 17150, 2)

        sum_distance += abs(distance)

        #print ('Sonar distance: ' + str(distance) + "cm")
        #print ("sleeping:", sample_seconds / sample_count)
        await asyncio.sleep(sample_seconds / sample_count)

    return sum_distance / sample_count


def sonar_close():
    print ("Sonar close")
    GPIO.cleanup()
