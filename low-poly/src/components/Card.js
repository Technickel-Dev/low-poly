const Card = ({ children, backgroundClass = "bg-white" }) => {
  return ( 
    <div className={`flex justify-center items-center h-full p-4 rounded overflow-hidden shadow-lg ${backgroundClass}`}>
      {children}
    </div>
  );
}
 
export default Card;