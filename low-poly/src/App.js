import ControlPanel from './ControlPanel';
import SVGPreview from './SVGPreview'
import TopNav from './TopNav'

function App() {
  return (
    <div className="h-screen bg-yellow-500">
      <TopNav />
      <div className="flex">
        <ControlPanel />
        <SVGPreview />
      </div>
    </div>
  );
}

export default App;
