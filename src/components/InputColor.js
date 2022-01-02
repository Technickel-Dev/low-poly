const InputNumber = ({ label, id, defaultValue, register }) => {
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
        // value={defaultValue}
        {...register(id)}
        className="shadow border rounded w-full py-1 px-1"
      />
    </div>
  );
};

export default InputNumber;
