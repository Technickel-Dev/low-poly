const SubmitButton = ({text = "Submit"}) => {
  return ( 
    <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded">
      {text}
    </button>
  );
}
 
export default SubmitButton;