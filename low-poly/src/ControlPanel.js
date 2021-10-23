import { useForm } from "react-hook-form";
import Card from "./Card"
import NumberInput from "./NumberInput"
import SubmitButton from "./SubmitButton"
import TextInput from "./TextInput"

const App = () => {
  const { handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="flex-1 m-4">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <TextInput label="Line Color" id="line-color" defaultValue="#000000" />
            <TextInput label="Background Color" id="background-color" defaultValue="#FFFFFF" />
            <NumberInput label="Stroke Width" id="stroke-width" defaultValue="5" />
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