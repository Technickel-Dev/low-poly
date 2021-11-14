export const processImageHexagon = async (cv, input, output) => {
  if (!cv) return;

  let mask = new cv.Mat();
  let bgdModel = new cv.Mat();
  let fgdModel = new cv.Mat();

  const src = cv.imread(input);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);

  let rect = new cv.Rect(55, 5, 285, 235);
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 4, cv.GC_INIT_WITH_RECT);

  applyMask(cv, src, mask);

  // cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY)
  // cv.threshold(src, src, 5, 255, cv.THRESH_BINARY);
  

  // const contours = new cv.MatVector();
  // const hierarchy = new cv.Mat();
  // cv.findContours(src, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

  // let maxContourArea = 0
  // let maxContourIndex = 0
  // console.log(contours.max)
  // console.log(contours);
  // contours.forEach((contour, i) => {
  //   const area = cv.contourArea(contour)
  //   if (area > maxContourArea) {
  //     maxContourArea = area;
  //     maxContourIndex = i;
  //   }
  // })
  
  // let color = new cv.Scalar(0, 255, 0, 255);

  // cv.drawContours(src, contours, maxContourIndex, color, 1, cv.LINE_8, hierarchy, 100);

  let limeColor = new cv.Scalar(0, 255, 0);
  let startPoint = new cv.Point(rect.x, rect.y);
  let endPoint = new cv.Point(rect.width, rect.height);
  cv.rectangle(src, startPoint, endPoint, limeColor)

  cv.imshow(output, src);

  src.delete(); mask.delete(); bgdModel.delete(); fgdModel.delete();
  // hierarchy.delete();
  // contours.delete();
}

const applyMask = (cv, src, mask) => {
  // Apply mask to image
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      if (mask.ucharPtr(i, j)[0] === cv.GC_BGD || mask.ucharPtr(i, j)[0] === cv.GC_PR_BGD) {
        src.ucharPtr(i, j)[0] = cv.GC_BGD;
        src.ucharPtr(i, j)[1] = cv.GC_BGD;
        src.ucharPtr(i, j)[2] = cv.GC_BGD;
      }
    }
  }
}