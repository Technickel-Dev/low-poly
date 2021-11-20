import { useOpenCv } from "opencv-react"
import { useForm } from "react-hook-form";
import Card from "./Card"
import InputNumber from "./InputNumber"
import InputText from "./InputText"
import Loading from "./Loading"
import useHexagonStore from "../store/useHexagonStore"
import SubmitButton from "./SubmitButton"

const App = () => {
  const { handleSubmit, register } = useForm();

  const {lineColor, backgroundColor, strokeWidth} = useHexagonStore(state => state.controlData)
  const setControlData = useHexagonStore(state => state.setControlData)
  const setFileURL = useHexagonStore(state => state.setFileURL)
  const { loaded: isOpenCVLoaded } = useOpenCv()

  const onSubmit = (data) => {
    let integerFields = ["strokeWidth"]

    // Store integer fields as integers rather than strings
    integerFields.forEach((field) => {
      data[field] = parseInt(data[field])
    })
    
    setControlData(data)
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
              <InputText label="Line Color" id="lineColor" defaultValue={lineColor} register={register} />
              <InputText label="Background Color" id="backgroundColor" defaultValue={backgroundColor} register={register} />
              <InputNumber label="Stroke Width" id="strokeWidth" defaultValue={strokeWidth} register={register} />
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