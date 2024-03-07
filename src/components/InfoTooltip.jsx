import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

const InfoTooltip = ({ id, text }) => {
  return (
    <>
      <FaInfoCircle className="ml-2 text-blue-400" data-tooltip-id={id} />
      <Tooltip
        id={id}
        data-tooltip-place="bottom"
        data-tooltip-type="info"
        data-tooltip-effect="solid"
        className="max-w-md"
        html={sanitizeHtml(text)}
      ></Tooltip>
    </>
  );
};

export default InfoTooltip;
