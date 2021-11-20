import Card from './Card'
import GeneratedSVG from './GeneratedSVG'
import InfoTooltip from './InfoTooltip'

const SVGPreview = () => {

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <h2 className="my-4 font-semibold text-xl tracking-tight text-center">SVG Preview</h2>
          <InfoTooltip 
            id="svgToolTip"
            text="This is the SVG output! When a file is uploaded and edited, the resulting output will show up here."
          />
        </div>
        <GeneratedSVG />
      </div>
    </Card>
  );
}
 
export default SVGPreview;