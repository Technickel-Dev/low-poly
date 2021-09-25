import cv2
import numpy as np

BLUR_VALUE = 9

# Check if a point is inside a rectangle
def rect_contains_point(rect, point):
  if point[0] < rect[0]:
    return False
  elif point[1] < rect[1]:
    return False
  elif point[0] > rect[2]:
    return False
  elif point[1] > rect[3]:
    return False
  return True


# Draw delaunay triangles
def draw_delaunay(image, subdiv, delaunay_color):
  triangleList = subdiv.getTriangleList()
  size = image.shape
  rectangle = (0, 0, size[1], size[0])

  for triangle in triangleList:
    pt1 = (int(triangle[0]), int(triangle[1]))
    pt2 = (int(triangle[2]), int(triangle[3]))
    pt3 = (int(triangle[4]), int(triangle[5]))

    if rect_contains_point(rectangle, pt1) and rect_contains_point(rectangle, pt2) and rect_contains_point(rectangle, pt3):
      cv2.line(image, pt1, pt2, delaunay_color, 1, cv2.LINE_AA, 0)
      cv2.line(image, pt2, pt3, delaunay_color, 1, cv2.LINE_AA, 0)
      cv2.line(image, pt3, pt1, delaunay_color, 1, cv2.LINE_AA, 0)

def edge_detection(image, sigma=0.33):
	# Compute the median of the single channel pixel intensities
	v = np.median(image)

  # Compute upper and lower bounds
	lower = int(max(0, (1.0 - sigma) * v))
	upper = int(min(255, (1.0 + sigma) * v))

	# Apply automatic Canny edge detection using the computed median
	edges_image = cv2.Canny(image, 0, 100)
	# return the image with edges detected
	return edges_image

# Read in the image
original_image = cv2.imread("lynx.jpeg")
image = original_image.copy()

# Convert the image to greyscale for edge detection
image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

ret, thresh = cv2.threshold(image, 150, 255, cv2.THRESH_BINARY)
# visualize the binary image
cv2.imshow('Binary image', thresh)
output_blurr = cv2.blur(thresh, (BLUR_VALUE, BLUR_VALUE))


contours, hierarchy = cv2.findContours(image=thresh, mode=cv2.RETR_TREE, method=cv2.CHAIN_APPROX_NONE)
# draw contours on the original image
image_copy = image.copy()
cv2.drawContours(image=image_copy, contours=contours, contourIdx=-1, color=(0, 255, 0), thickness=2, lineType=cv2.LINE_AA)
cv2.imshow('None approximation', image_copy)

# Colour for drawing
delaunay_color = (255, 255, 255)

# Make a rectangle the size of the image so that we know the working area
size = original_image.shape
working_area = (0, 0, size[1], size[0])

# Get the sub division of the working area for the image
subdiv = cv2.Subdiv2D(working_area)

# Blur the image to reduce any noise when performing edge detection
output_blur = cv2.blur(image, (BLUR_VALUE, BLUR_VALUE))

# Perform edge detection on the image
output_edges = edge_detection(output_blur)

# Get the points that best represent the image
points = [(100, 100), (100, 200), (200, 150)]

# Insert the points into the sub division
for point in points:
  subdiv.insert(point)

# Draw the triangles
draw_delaunay(image, subdiv, delaunay_color)

# Show images
# cv2.imshow("Original", image)
# cv2.imshow("Blur", output_blur)
# cv2.imshow("Edge", output_edges)
cv2.waitKey(0)

