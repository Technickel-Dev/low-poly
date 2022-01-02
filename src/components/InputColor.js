const InputColor = ({ label, id, defaultValue, register }) => {
  return (
    <div className="mb-4 mr-2">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        type="color"
        defaultValue={defaultValue}
        id={id}
        {...register(id)}
        className="shadow border rounded w-40 py-2 px-2 h-10"
      />
    </div>
  );
};

export default InputColor;
