import { useOpenCv } from "opencv-react";
import { useForm } from "react-hook-form";
import Card from "./Card";
import InputNumber from "./InputNumber";
import InputText from "./InputText";
import Loading from "./Loading";
import useHexagonStore from "../store/useHexagonStore";
import SubmitButton from "./SubmitButton";
import fillBlack from "../utilities/fillBlack";
import ChooseFileButton from "./ChooseFileButton";
import { useState } from "react";

const App = () => {
  const { handleSubmit, register } = useForm();
  const [filename, setFileName] = useState("No file Chosen");

  const { lineColor, backgroundColor, strokeWidth, blurKernal, erosionKernal } =
    useHexagonStore((state) => state.controlData);
  const setControlData = useHexagonStore((state) => state.setControlData);
  const setFileURL = useHexagonStore((state) => state.setFileURL);
  const { loaded: isOpenCVLoaded } = useOpenCv();

  const onSubmit = (data) => {
    let integerFields = ["strokeWidth", "blurKernal"];

    // Store integer fields as integers rather than strings
    integerFields.forEach((field) => {
      data[field] = parseInt(data[field]);
    });

    setControlData(data);
  };

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFileName(selectedFile.name);
    fillBlack();
    setFileURL(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="col-span-2">
      <Card>
        {isOpenCVLoaded ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-wrap justify-evenly">
              <InputText
                label="Line Color"
                id="lineColor"
                defaultValue={lineColor}
                register={register}
              />
              <InputText
                label="Background Color"
                id="backgroundColor"
                defaultValue={backgroundColor}
                register={register}
              />
              <InputNumber
                label="Stroke Width"
                id="strokeWidth"
                defaultValue={strokeWidth}
                register={register}
              />
              <InputNumber
                label="Blur Kernal"
                id="blurKernal"
                defaultValue={blurKernal}
                register={register}
              />
              <InputNumber
                label="Erosion Kernal"
                id="erosionKernal"
                defaultValue={erosionKernal}
                register={register}
              />
            </div>
            <div className="flex justify-center my-2">
              <SubmitButton />
            </div>
            <ChooseFileButton onChange={onFileChange} filename={filename} />
          </form>
        ) : (
          <Loading />
        )}
      </Card>
    </div>
  );
};

export default App;
