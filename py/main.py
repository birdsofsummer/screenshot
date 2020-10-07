import datetime
import os
import time

#import sys
#sys.path.append('/usr/local/lib/python3.8/site-packages')
import numpy as np
import cv2
import pyautogui


today=lambda:datetime.datetime.now().strftime('%Y-%m-%d %w')
now=lambda:datetime.datetime.now()

def md(file_path="/tmp/a/b/c"):
    print("md",file_path)
    try:
       os.makedirs(file_path)
    except:
       print(file_path,'exist?')

def today1():
    t=datetime.date.today()
    #y,m,d,w=t.year,t.month,t.day,t.weekday()
    return t.strftime('%Y%m%d')


def shot(name="xxx.png"):
    image = pyautogui.screenshot()
    image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    cv2.imwrite(name, image)
    #cv2.imshow("window",image)
    #if cv2.waitKey(25) & 0xFF ==ord("q"):
    #    cv2.destroyAllWindows()
    #    break

# shot1("xxx.png")
shot1=lambda x:pyautogui.screenshot(x)

def shot2(name="xxx.png",region=[0,0,100,100]):
    image = pyautogui.screenshot(region=region) # x,y,w,h
    image.save(name)

def show(name="xxx.png"):
    image = cv2.imread(name)
    cv2.imshow("Screenshot", imutils.resize(image, width=600))
    cv2.waitKey(0)


def main(n=3,t=1):
    path=now().strftime('%Y/%m/%Y-%m-%d %w')
    md(path)
    for i in range(1,n):
        name=now().strftime('%Y/%m/%Y-%m-%d %w/%Y%m%d_%H%M%S.png')
        print(name)
        shot(name)
        time.sleep(t)

main()
