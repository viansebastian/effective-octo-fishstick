import cv2
import numpy as np
import requests
from PIL import Image
import json
# from google.colab.patches import cv2_imshow


# image = Image.open(requests.get('https://s.wsj.net/public/resources/images/BN-WB347_3gljM_OR_20171109123717.jpg', stream=True).raw)
image = Image.open(requests.get('https://a57.foxnews.com/media.foxbusiness.com/BrightCove/854081161001/201805/2879/931/524/854081161001_5782482890001_5782477388001-vs.jpg', stream=True).raw)
image = image.resize((450,250))
image_arr = np.array(image)
image

image_gray = cv2.cvtColor(image_arr, cv2.COLOR_BGR2GRAY)
Image.fromarray(image_gray)

blurred = cv2.GaussianBlur(image_gray, (5, 5), 0)
Image.fromarray(blurred)

dilated = cv2.dilate(blurred,np.ones((3, 3)))
Image.fromarray(dilated)

kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
closing = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel)
Image.fromarray(closing)

import requests
from io import BytesIO
import os

# url = "https://raw.githubusercontent.com/andrewssobral/vehicle_detection_haarcascades/master/cars.xml"
# response = requests.get(url)

# if response.status_code == 200:

#     content = response.content

#     with open('cars.xml', 'wb') as file:
#         file.write(content)

#     if os.path.exists('cars.xml'):
#         print("Haar Cascade file downloaded successfully.")
#         car_cascade_src = 'cars.xml'
#     else:
#         print("Error: 'cars.xml' not found.")
# else:
#     print(f"Error downloading Haar Cascade file. Status code: {response.status_code}")


car_cascade_src = 'cars.xml'
car_cascade = cv2.CascadeClassifier(car_cascade_src)
cars = car_cascade.detectMultiScale(closing, 1.1, 1)
cars

cnt = 0
for (x,y,w,h) in cars:
    cv2.rectangle(image_arr,(x,y),(x+w,y+h),(255,0,0),2)
    cnt += 1
print(cnt, " cars found")
Image.fromarray(image_arr)

if (cnt > 0): 
    # priority = 
    url = "http://localhost:5000/traffic"
    payload = {"count" : cnt}
    print(cnt)
    headers = {"Content-Type": "application/json"}
    response = requests.get(url, data=json.dumps(payload), headers=headers)
    
print(response)