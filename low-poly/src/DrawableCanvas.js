import { useEffect, useRef } from "react"
import useHexagonStore from "./store/useHexagonStore"

const DrawableCanvas = ({ id, width, height }) => {
  const canvas = useRef();
  const fileURL = useHexagonStore(state => state.fileURL)

  const scaleToFit = (canvas, img) => {
    // Get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    
    // Get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;

    // Draw the image
    const context = canvas.getContext('2d');
    context.drawImage(img, x, y, img.width * scale, img.height * scale);
  }
  
  useEffect(() => {    
    if(fileURL) {
      var img = new Image();
      img.src = fileURL

      img.onload = (e) => {
        scaleToFit(canvas.current, e.target)
      }
    }
  }, [fileURL]);

  return ( 
    <canvas id={id} ref={canvas} width={width} height={height} />
  );
}
 
export default DrawableCanvas;