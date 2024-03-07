import { useEffect, useRef, useState } from "react";
import useHexagonStore from "../store/useHexagonStore";

const DrawableCanvas = ({ id, width, height, drawCallback }) => {
  const canvas = useRef();
  const drawLayerCanvas = useRef();
  const fileURL = useHexagonStore((state) => state.fileURL);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("green");
  const [drawTool, setDrawTool] = useState("");

  const scaleToFit = (canvas, img) => {
    // Get the scale factor
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);

    // Get the top left position of the image
    var x = canvas.width / 2 - (img.width / 2) * scale;
    var y = canvas.height / 2 - (img.height / 2) * scale;

    // Draw the image
    const context = canvas.getContext("2d");
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  };

  const getMousePosition = (e) => {
    let box = drawLayerCanvas.current.getBoundingClientRect();
    return { x: e.clientX - box.left, y: e.clientY - box.top };
  };

  const handleMouseDown = (e) => {
    const context = drawLayerCanvas.current.getContext("2d");
    context.lineWidth = 5;
    context.lineJoin = context.lineCap = "round";
    context.strokeStyle = color;

    setIsDrawing(true);
    context.beginPath();

    let mousePos = getMousePosition(e);
    context.moveTo(mousePos.x, mousePos.y);
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const context = drawLayerCanvas.current.getContext("2d");
      let mousePos = getMousePosition(e);
      context.lineTo(mousePos.x, mousePos.y);
      context.stroke();
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
    drawCallback();
  };

  const handleClear = () => {
    const context = drawLayerCanvas.current.getContext("2d");
    context.clearRect(
      0,
      0,
      drawLayerCanvas.current.width,
      drawLayerCanvas.current.height
    );
  };

  const handleChangeTool = (mode) => {
    if (mode === "foreground") {
      setColor("green");
    } else {
      setColor("red");
    }
  };

  useEffect(() => {
    if (fileURL) {
      // Load image into canvas
      var img = new Image();
      img.src = fileURL;

      img.onload = (e) => {
        scaleToFit(canvas.current, e.target);
        drawCallback();
      };
    }
  }, [fileURL, drawCallback]);

  // Stack two canvases on each other to be able to display the image on one and draw on the other
  // https://stackoverflow.com/questions/20915484/stacking-multiple-canvases-in-html5/20918871#20918871
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="flex flex-col justify-evenly">
        <button
          className="bg-yellow-500 text-white py-2 px-4 rounded"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          className={" text-white py-2 px-4 rounded " + (drawTool === "foreground" ? "bg-yellow-600" : "bg-yellow-500")}
          onClick={() => {
            handleChangeTool("foreground");
            setDrawTool("foreground")
          }}
        >
          Foreground
        </button>
        <button
          className={"text-white py-2 px-4 rounded " + (drawTool === "background" ? "bg-yellow-600" : "bg-yellow-500")}
          onClick={() => {
            handleChangeTool("background");
            setDrawTool("background")
          }}
        >
          Background
        </button>
      </div>
      <div id="stack-container" className="relative col-span-2">
        <canvas id={id} ref={canvas} width={width} height={height} />
        <canvas
          id="canvas-draw-layer"
          className="absolute top-0 left-0"
          ref={drawLayerCanvas}
          width={width}
          height={height}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
};

export default DrawableCanvas;
