import Card from './Card'
import GeneratedSVG from './GeneratedSVG'
import InfoTooltip from './InfoTooltip'
import { FaFileDownload } from 'react-icons/fa';

const SVGPreview = () => {

  const downloadSVG = () => {
    const svg = document.getElementById('svgContainer').innerHTML;
    const blob = new Blob([svg.toString()]);
    const tmpEl = document.createElement("a");
    tmpEl.download = "test.svg";
    tmpEl.href = window.URL.createObjectURL(blob);
    tmpEl.click();
    tmpEl.remove();
  }

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <button className="bg-yellow-500 text-white py-2 px-4 rounded mr-4" onClick={downloadSVG}>
            <FaFileDownload />
          </button>
          <h2 className="my-4 font-semibold text-xl tracking-tight text-center">SVG Preview</h2>
          <InfoTooltip 
            id="svgToolTip"
            text="This is the SVG output! When a file is uploaded and edited, the resulting output will show up here."
          />
        </div>
        <div id="svgContainer">
          <GeneratedSVG />
        </div>
      </div>
    </Card>
  );
}
 
export default SVGPreview;