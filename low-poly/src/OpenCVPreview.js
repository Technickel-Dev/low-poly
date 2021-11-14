import Card from './Card'
import useHexagonStore from './store/useHexagonStore'
import { useOpenCv } from 'opencv-react'
import { processImageHexagon } from './ImageProcessing'
import DrawableCanvas from './DrawableCanvas'

const OpenCVPreview = () => {
  const fileURL = useHexagonStore(state => state.fileURL)
  const { cv } = useOpenCv()
  
  return (
    <Card>
      <div className="flex justify-center">
        { fileURL && <DrawableCanvas id={"canvas-input"} width={350} height={350} /> }
        <canvas id="canvas-output" width="350" height="350"/>
        <button onClick={() => { processImageHexagon(cv, 'canvas-input', 'canvas-output') }}>CLICK</button>
      </div>
    </Card>
  );
}
 
export default OpenCVPreview;