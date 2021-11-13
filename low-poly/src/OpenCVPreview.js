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
        {/* { fileURL && <img id="image" style={{maxHeight: 350, maxWidth: 350}} src={fileURL} alt="Uploaded file"/> } */}
        { fileURL && <DrawableCanvas id={"canvas-input"} width={350} height={350} /> }
        <canvas id="canvas-output" width="350" height="350"/>
        {/* <button onClick={() => { processImageHexagon(cv, 'image', 'canvas-output') }}>CLICK</button> */}
      </div>
    </Card>
  );
}
 
export default OpenCVPreview;