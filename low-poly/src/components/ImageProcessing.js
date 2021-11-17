export const removeBackground = async (cv, input, drawLayer, output, callback) => {
  if (!cv) return;

  let bgdModel = new cv.Mat();
  let fgdModel = new cv.Mat();

  let touchUpMask = cv.imread(drawLayer, 0);
  let mask = new cv.Mat(touchUpMask.rows, touchUpMask.cols, touchUpMask.type());

  const src = cv.imread(input);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB, 0);

  // Have grabcut make its prediction
  let rect = new cv.Rect(0, 0, src.cols - 1, src.rows - 1);
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 4, cv.GC_INIT_WITH_RECT);

  // Apply manual touch ups
  applyTouchUpMask(cv, mask, touchUpMask);
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 5, cv.GC_INIT_WITH_MASK);

  // Apply the resulting mask to the image and display it
  drawMask(cv, src, mask);
  cv.imshow(output, src);

  src.delete(); touchUpMask.delete(); mask.delete(); bgdModel.delete(); fgdModel.delete();

  await callback()
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
  for (let i = 0; i < contours.size(); i++) {
    let area = cv.contourArea(contours.get(i), false);
    if (area > maxContourArea) {
      maxContourArea = area
      maxContourIndex = i
    }
  }

  cv.drawContours(src, contours, maxContourIndex, contourColor, 1, cv.LINE_8, hierarchy, 0);
  cv.imshow(output, src);

  let maxContour = contours.get(maxContourIndex)
  let dataPath = ""
  for (let i = 0; i < maxContour.data32S.length; i += 2){
    let x = maxContour.data32S[i]
    let y = maxContour.data32S[i + 1]

    // Build the data path for the SVG
    dataPath += `${x} ${y} `
  }

  src.delete(); srcCopy.delete(); contours.delete(); hierarchy.delete();

  return dataPath
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

