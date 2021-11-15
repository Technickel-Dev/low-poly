import Card from './Card'
import useHexagonStore from './store/useHexagonStore'
import { useOpenCv } from 'opencv-react'
import { hexagonify, removeBackground } from './ImageProcessing'
import DrawableCanvas from './DrawableCanvas'

const OpenCVPreview = () => {
  const fileURL = useHexagonStore(state => state.fileURL)
  const { cv } = useOpenCv()
  
  return (
    <div className="m-4">
      <Card>
        <div className="flex justify-center">
          { fileURL && <DrawableCanvas id={"canvas-input"} width={350} height={350} /> }
          <canvas id="canvas-removed-background" width="350" height="350"/>
          <canvas id="canvas-thresh" width="350" height="350"/>
          <canvas id="canvas-output" width="350" height="350"/>
          <button onClick={() => { removeBackground(cv, 'canvas-input', 'canvas-draw-layer', 'canvas-removed-background') }}>CLICK</button>
          <button onClick={() => { hexagonify(cv, 'canvas-removed-background', 'canvas-thresh', 'canvas-output') }}>CLICK 2</button>
        </div>
      </Card>
    </div>
  );
}
 
export default OpenCVPreview;