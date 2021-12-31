const ChooseFileButton = ({ text = "Choose File", onChange, filename }) => {
  return (
    <div>
      <input hidden type="file" id="choose-file-btn" onChange={onChange} />
      <label
        htmlFor="choose-file-btn"
        className="bg-red-500 text-white py-2 px-4 mr-2 rounded"
        style={{ cursor: "pointer" }}
      >
        {text}
      </label>
      <span>{filename}</span>
    </div>
  );
};

export default ChooseFileButton;
