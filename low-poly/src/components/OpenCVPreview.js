import Card from './Card'
import useHexagonStore from '../store/useHexagonStore'
import { useOpenCv } from 'opencv-react'
import { hexagonify, removeBackground } from './ImageProcessing'
import DrawableCanvas from './DrawableCanvas'

const OpenCVPreview = () => {
  const fileURL = useHexagonStore(state => state.fileURL)
  const setDataPath = useHexagonStore(state => state.setDataPath)
  const { cv } = useOpenCv()
  
  return (
      <div className="col-span-full">
        <Card>
          <div className="flex justify-center">
            { fileURL && <DrawableCanvas id={"canvas-input"} width={350} height={350} drawCallback={() => { 
              removeBackground(cv, 'canvas-input', 'canvas-draw-layer', 'canvas-removed-background', () => { 
                hexagonify(cv, 'canvas-removed-background', 'canvas-thresh', 'canvas-output').then((dataPath) => {
                  setDataPath(dataPath)
                })
              })
            }} /> }
            <canvas id="canvas-removed-background" width="350" height="350"/>
            <canvas id="canvas-thresh" width="350" height="350"/>
            <canvas id="canvas-output" width="350" height="350"/>
          </div>
        </Card>
      </div>
  );
}
 
export default OpenCVPreview;