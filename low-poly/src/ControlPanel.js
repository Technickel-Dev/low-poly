import { useForm } from "react-hook-form";
import Card from "./Card"
import NumberInput from "./NumberInput"
import useHexagonStore from "./store/useHexagonStore"
import SubmitButton from "./SubmitButton"
import TextInput from "./TextInput"

const App = () => {
  const { handleSubmit, register } = useForm();

  const lineColor = useHexagonStore(state => state.lineColor)
  const setLineColor = useHexagonStore(state => state.setLineColor)
  const backgroundColor = useHexagonStore(state => state.backgroundColor)
  const setBackgroundColor = useHexagonStore(state => state.setBackgroundColor)
  const strokeWidth = useHexagonStore(state => state.strokeWidth)
  const setStrokeWidth = useHexagonStore(state => state.setStrokeWidth)

  const onSubmit = (data) => {
    setLineColor(data["line-color"])
    setBackgroundColor(data["background-color"])
    setStrokeWidth(parseInt(data["stroke-width"]))
  }

  return (
    <div className="flex-1 m-4">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <TextInput label="Line Color" id="line-color" defaultValue={lineColor} register={register} />
            <TextInput label="Background Color" id="background-color" defaultValue={backgroundColor} register={register} />
            <NumberInput label="Stroke Width" id="stroke-width" defaultValue={strokeWidth} register={register} />
          </div>
          <div className="flex justify-center mt-2">
            <SubmitButton />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default App;