import ControlPanel from './ControlPanel';
import SVGPreview from './SVGPreview'
import TopNav from './TopNav'
import { OpenCvProvider } from 'opencv-react'
import OpenCVPreview from './OpenCVPreview'

const App = () => {

  return (
    <OpenCvProvider openCvPath='/opencv/opencv.js'>
      <div className="h-screen bg-yellow-500">
        <TopNav />
        <div className="flex my-4 mx-4">
          <ControlPanel />
          <SVGPreview />
        </div>
        <OpenCVPreview />
      </div>
    </OpenCvProvider>
  );
}

export default App;
