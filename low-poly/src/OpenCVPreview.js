import { useEffect } from 'react'
import Card from './Card'
import useHexagonStore from './store/useHexagonStore'
import { useOpenCv } from 'opencv-react'

const OpenCVPreview = () => {
  const fileURL = useHexagonStore(state => state.fileURL)
  const { cv } = useOpenCv()

  useEffect(() => {
    if(cv && fileURL) {
      console.log("Running");
      let src = cv.imread('image');
      let gray = new cv.Mat();
      let thresh = new cv.Mat();
      cv.cvtColor(src, gray, cv.COLOR_BGR2GRAY)
      cv.threshold(gray, thresh, 5, 255, cv.THRESH_BINARY)
      cv.imshow('canvas', gray);
      src.delete();
      gray.delete();
      thresh.delete();
    }
  }, [cv, fileURL]);

  
  return (
    <Card>
      <div className="flex justify-center">
        { fileURL && <img id="image" width="350" height="350" src={fileURL} alt="Uploaded file"/> }
        
        <canvas id="canvas" width="350" height="350"/>
      </div>
    </Card>
  );
}
 
export default OpenCVPreview;