export const removeBackground = async (cv, input, drawLayer, output) => {
  if (!cv) return;

  let bgdModel = new cv.Mat();
  let fgdModel = new cv.Mat();

  let touchUpMask = cv.imread(drawLayer, 0);
  let mask = new cv.Mat(touchUpMask.rows, touchUpMask.cols, touchUpMask.type());

  const src = cv.imread(input);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);

  let rect = new cv.Rect(0, 0, src.cols - 1, src.rows - 1);
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 4, cv.GC_INIT_WITH_RECT);

  applyTouchUpMask(cv, mask, touchUpMask);

  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 5, cv.GC_INIT_WITH_MASK);

  drawMask(cv, src, mask);

  let limeColor = new cv.Scalar(0, 255, 0);
  let startPoint = new cv.Point(rect.x, rect.y);
  let endPoint = new cv.Point(rect.width, rect.height);
  cv.rectangle(src, startPoint, endPoint, limeColor)

  cv.imshow(output, src);

  src.delete(); touchUpMask.delete(); mask.delete(); bgdModel.delete(); fgdModel.delete();
}

export const hexagonify = async (cv, input, thresh, output) => {
  if (!cv) return;

  const src = cv.imread(input);
  const srcCopy = cv.imread(input);
  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();

  cv.cvtColor(srcCopy, srcCopy, cv.COLOR_RGBA2GRAY)
  cv.threshold(srcCopy, srcCopy, 5, 255, cv.THRESH_BINARY);

  let kernal = new cv.Size(3, 3);
  cv.GaussianBlur(srcCopy, srcCopy, kernal, 0, 0, cv.BORDER_DEFAULT);

  cv.imshow(thresh, srcCopy);

  let maxContourIndex = 0
  let maxContourArea = 0
  let contourColor = new cv.Scalar(0, 255, 0, 255);

  cv.findContours(srcCopy, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
  for (let i = 0; i < contours.length; i++) {
    let area = cv.contourArea(contours[i], false);
    if (area > maxContourArea) {
      maxContourArea = area
      maxContourIndex = i
    }
  }
  cv.drawContours(src, contours, maxContourIndex, contourColor, 1, cv.LINE_8, hierarchy, 0);

  cv.imshow(output, src);

  src.delete(); srcCopy.delete(); contours.delete(); hierarchy.delete();
}

const drawMask = (cv, src, mask) => {
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

const applyTouchUpMask = (cv, mask, touchUpMask) => {
  for (let i = 0; i < touchUpMask.rows; i++) {
    for (let j = 0; j < touchUpMask.cols; j++) {
      // If the color is green, it's foreground
      if (touchUpMask.ucharPtr(i, j)[1] === 128) {
        mask.ucharPtr(i, j)[0] = cv.GC_FGD;
        mask.ucharPtr(i, j)[1] = cv.GC_FGD;
        mask.ucharPtr(i, j)[2] = cv.GC_FGD;
      }

      // If the color is red, it's background
      if (touchUpMask.ucharPtr(i, j)[0] === 255) {
        mask.ucharPtr(i, j)[0] = cv.GC_BGD;
        mask.ucharPtr(i, j)[1] = cv.GC_BGD;
        mask.ucharPtr(i, j)[2] = cv.GC_BGD;
      }
    }
  }
}

