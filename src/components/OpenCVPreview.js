import Card from "./Card";
import useHexagonStore from "../store/useHexagonStore";
import { useOpenCv } from "opencv-react";
import { hexagonify, removeBackground } from "./ImageProcessing";
import DrawableCanvas from "./DrawableCanvas";
import InfoTooltip from "./InfoTooltip";
import { useEffect } from "react";
import fillBlack from "../utilities/fillBlack";

const OpenCVPreview = () => {
  const { blurKernal } = useHexagonStore((state) => state.controlData);
  const setDataPath = useHexagonStore((state) => state.setDataPath);
  const { cv } = useOpenCv();

  // Fill all canvases with black
  useEffect(() => {
    fillBlack();
  }, []);

  const debounce = (func, wait, immediate) => {
    var timeout;
    return (...args) => {
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(this, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(this, args);
    };
  };

  return (
    <div className="col-span-full">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <h2 className="my-4 font-semibold text-xl tracking-tight text-center">
                Draw Preview
              </h2>
              <InfoTooltip
                id="drawToolTip"
                text="When a file is uploaded, you are able to use this panel to mark the image up denoting the foreground
                and the background. Green marks represent the foreground while red ones represent the background. <br><br> You can switch
                between the different colors using the buttons on the left. If you make a mistake, use the clear button to start over."
              />
            </div>
            <DrawableCanvas
              id={"canvas-input"}
              width={350}
              height={350}
              drawCallback={debounce(() => {
                removeBackground(
                  cv,
                  "canvas-input",
                  "canvas-draw-layer",
                  "canvas-removed-background",
                  () => {
                    hexagonify(
                      cv,
                      blurKernal,
                      "canvas-removed-background",
                      "canvas-thresh",
                      "canvas-output"
                    ).then((dataPath) => {
                      setDataPath(dataPath);
                    });
                  }
                );
              }, 1500)}
            />
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <h2 className="my-4 font-semibold text-xl tracking-tight text-center">
                Removed Background Preview
              </h2>
              <InfoTooltip
                id="removeBackgroundToolTip"
                text="This is a preview of what the image looks like with it's background removed. You can remove more / less
                background using the <em>Draw Preview</em> section."
              />
            </div>
            <canvas id="canvas-removed-background" width="350" height="350" />
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <h2 className="my-4 font-semibold text-xl tracking-tight text-center">
                Threshold Preview
              </h2>
              <InfoTooltip
                id="thresholdToolTip"
                text="This is a preview of what the image looks like with thresholding and other image manipulation procedures
                applied."
              />
            </div>
            <canvas id="canvas-thresh" width="350" height="350" />
          </div>
        </Card>
        <Card>
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <h2 className="my-4 font-semibold text-xl tracking-tight text-center">
                Contour Preview
              </h2>
              <InfoTooltip
                id="contourToolTip"
                text="This is a preview of what contour is found for the image. To change the overall contour, either change the
                removed background using the <em>Draw Preview</em> section or experiment with the thresholding / image
                manipulation settings."
              />
            </div>
            <canvas id="canvas-output" width="350" height="350" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OpenCVPreview;
