import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import sanitizeHtml from "sanitize-html";

const InfoTooltip = ({ id, text }) => {
  return (
    <>
      <FaInfoCircle className="ml-2 text-blue-400" data-tip data-for={id} />
      <Tooltip
        id={id}
        place="bottom"
        type="info"
        effect="solid"
        html={true}
        className="max-w-md"
      >
        {sanitizeHtml(text)}
      </Tooltip>
    </>
  );
};

export default InfoTooltip;
