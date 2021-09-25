import cv2

def nothing(x):
  pass

cv2.namedWindow('Track Bars', cv2.WINDOW_AUTOSIZE)

cv2.createTrackbar('min_blue', 'Track Bars', 0, 255, nothing)
cv2.createTrackbar('min_green', 'Track Bars', 0, 255, nothing)
cv2.createTrackbar('min_red', 'Track Bars', 0, 255, nothing)

cv2.createTrackbar('max_blue', 'Track Bars', 0, 255, nothing)
cv2.createTrackbar('max_green', 'Track Bars', 0, 255, nothing)
cv2.createTrackbar('max_red', 'Track Bars', 0, 255, nothing)

# Read in the image
image = cv2.imread("cow.jpeg")

hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

#showing both resized and hsv image in named windows
# cv2.imshow('Base Image', image)
# cv2.imshow('HSV Image', hsv_image)

while(1):
  k = cv2.waitKey(1) & 0xFF
  if k == 27:
    break

  #reading the trackbar values for thresholds
  min_blue = cv2.getTrackbarPos('min_blue', 'Track Bars')
  min_green = cv2.getTrackbarPos('min_green', 'Track Bars')
  min_red = cv2.getTrackbarPos('min_red', 'Track Bars')
  
  max_blue = cv2.getTrackbarPos('max_blue', 'Track Bars')
  max_green = cv2.getTrackbarPos('max_green', 'Track Bars')
  max_red = cv2.getTrackbarPos('max_red', 'Track Bars')
  
  #using inrange function to turn on the image pixels where object threshold is matched
  mask = cv2.inRange(hsv_image, (min_blue, min_green, min_red), (max_blue, max_green, max_red))
  #showing the mask image
  cv2.imshow('Mask Image', mask)
  # checking if q key is pressed to break out of loop

cv2.destroyAllWindows()