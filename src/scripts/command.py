#!/usr/bin/env python3
#-- coding: utf-8 --
import sys
import signal
import RPi.GPIO as GPIO
from flask import Flask, request, Response, render_template
from gpio import read_gpio
import time
import urllib.request
import os
import pigpio

PIGPIO  = pigpio.pi()

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

PIN_SAVEUR_1 = 4
PIN_SAVEUR_2 = 17
PIN_SAVEUR_3 = 22
PIN_SAVEUR_4 = 23
PIN_SAVEUR_5 = 24
PIN_EAU = 25

GPIO.setup(PIN_SAVEUR_1, GPIO.OUT)
GPIO.setup(PIN_SAVEUR_2, GPIO.OUT)
GPIO.setup(PIN_SAVEUR_3, GPIO.OUT)
GPIO.setup(PIN_SAVEUR_4, GPIO.OUT)
GPIO.setup(PIN_SAVEUR_5, GPIO.OUT)
GPIO.setup(PIN_EAU, GPIO.OUT)


############################################################################################
# Server Flask
############################################################################################
# initialize a flask object
app = Flask(__name__)

@app.route("/command/<int:saveur>/<int:timems>")
def command_saveur(saveur, timems):
    if saveur == 1:
        GPIO.output(PIN_SAVEUR_1, GPIO.HIGH)
    if saveur == 2:
        GPIO.output(PIN_SAVEUR_2, GPIO.HIGH)
    if saveur == 3:
        GPIO.output(PIN_SAVEUR_3, GPIO.HIGH)
    if saveur == 4:
        GPIO.output(PIN_SAVEUR_4, GPIO.HIGH)
    if saveur == 5:
        GPIO.output(PIN_SAVEUR_5, GPIO.HIGH)
    if saveur == 6:
        GPIO.output(PIN_EAU, GPIO.HIGH)

    seconds= (timems/1000)%60
    time.sleep(seconds)

    if saveur == 1:
        GPIO.output(PIN_SAVEUR_1, GPIO.LOW)
    if saveur == 2:
        GPIO.output(PIN_SAVEUR_2, GPIO.LOW)
    if saveur == 3:
        GPIO.output(PIN_SAVEUR_3, GPIO.LOW)
    if saveur == 4:
        GPIO.output(PIN_SAVEUR_4, GPIO.LOW)
    if saveur == 5:
        GPIO.output(PIN_SAVEUR_5, GPIO.LOW)
    if saveur == 6:
        GPIO.output(PIN_EAU, GPIO.LOW)

    return 'ok'

@app.route("/stopAlert")
def stopProgram():
    GPIO.output(PIN_SAVEUR_1, GPIO.LOW)
    GPIO.output(PIN_SAVEUR_2, GPIO.LOW)
    GPIO.output(PIN_SAVEUR_3, GPIO.LOW)
    GPIO.output(PIN_SAVEUR_4, GPIO.LOW)
    GPIO.output(PIN_SAVEUR_5, GPIO.LOW)
    GPIO.output(PIN_EAU, GPIO.LOW)

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', port=9000, debug=False, threaded=True, use_reloader=False)

    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        cleanAll("SHUTDOWN")