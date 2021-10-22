import React from "react";
import { useForm } from "react-hook-form";
import Card from "./Card"
import SubmitButton from "./SubmitButton"

const App = () => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="flex-1 m-4">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="example">
              Example
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" defaultValue="test" {...register("example")} />
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