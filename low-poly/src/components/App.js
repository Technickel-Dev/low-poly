import ControlPanel from './ControlPanel';
import SVGPreview from './SVGPreview'
import TopNav from './TopNav'
import { OpenCvProvider } from 'opencv-react'
import OpenCVPreview from './OpenCVPreview'

const App = () => {

  return (
    <div className="bg-yellow-500">
      <OpenCvProvider>
        <TopNav />
        <div className="grid grid-cols-3 gap-4 p-4">
          <ControlPanel />
          <SVGPreview />
          <OpenCVPreview />
        </div>
      </OpenCvProvider>
    </div>
  );
}

export default App;
