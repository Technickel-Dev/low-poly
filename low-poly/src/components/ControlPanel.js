import { useOpenCv } from "opencv-react"
import { useForm } from "react-hook-form";
import Card from "./Card"
import InputNumber from "./InputNumber"
import InputText from "./InputText"
import Loading from "./Loading"
import useHexagonStore from "./store/useHexagonStore"
import SubmitButton from "./SubmitButton"

const App = () => {
  const { handleSubmit, register } = useForm();

  const lineColor = useHexagonStore(state => state.lineColor)
  const setLineColor = useHexagonStore(state => state.setLineColor)
  const backgroundColor = useHexagonStore(state => state.backgroundColor)
  const setBackgroundColor = useHexagonStore(state => state.setBackgroundColor)
  const strokeWidth = useHexagonStore(state => state.strokeWidth)
  const setStrokeWidth = useHexagonStore(state => state.setStrokeWidth)
  const setFileURL = useHexagonStore(state => state.setFileURL)
  const { loaded: isOpenCVLoaded } = useOpenCv()

  const onSubmit = (data) => {
    setLineColor(data["line-color"])
    setBackgroundColor(data["background-color"])
    setStrokeWidth(parseInt(data["stroke-width"]))
  }

  const onFileChange = (e) => {
    setFileURL(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className="col-span-2">
      <Card>
        {isOpenCVLoaded ?
          <form className="flex-grow flex flex-col w-100" onSubmit={handleSubmit(onSubmit)}>
              <input type="file" id="file-input" className="mb-4" name="file" onChange={onFileChange} />
              <InputText label="Line Color" id="line-color" defaultValue={lineColor} register={register} />
              <InputText label="Background Color" id="background-color" defaultValue={backgroundColor} register={register} />
              <InputNumber label="Stroke Width" id="stroke-width" defaultValue={strokeWidth} register={register} />
            <div className="flex justify-center mt-2">
              <SubmitButton />
            </div>
          </form> :
          <Loading />
        }
      </Card>
    </div>
  );
}

export default App;