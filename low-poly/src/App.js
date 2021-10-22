import Card from './Card'
import ControlPanel from './ControlPanel';

function App() {
  return (
    <div className="h-screen flex bg-yellow-500">
      <ControlPanel></ControlPanel>
      <div className="flex-1 m-4">
        <Card></Card>
      </div>
    </div>
  );
}

export default App;
