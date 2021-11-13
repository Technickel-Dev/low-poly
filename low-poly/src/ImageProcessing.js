export const processImageHexagon = async (cv, input, output) => {
  if (!cv) return;

  const src = cv.imread(input);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY)
  cv.threshold(src, src, 5, 255, cv.THRESH_BINARY);
  

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(src, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

  // let maxContourArea = 0
  let maxContourIndex = 0
  console.log(contours.max)
  // console.log(contours);
  // contours.forEach((contour, i) => {
  //   const area = cv.contourArea(contour)
  //   if (area > maxContourArea) {
  //     maxContourArea = area;
  //     maxContourIndex = i;
  //   }
  // })
  
  let color = new cv.Scalar(0, 255, 0, 255);

  cv.drawContours(src, contours, maxContourIndex, color, 1, cv.LINE_8, hierarchy, 100);

  cv.imshow(output, src);

  src.delete();
  hierarchy.delete();
  contours.delete();
}