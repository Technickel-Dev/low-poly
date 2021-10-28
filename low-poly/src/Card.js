const Card = ({ children, backgroundClass = "bg-white" }) => {
  return ( 
    <div className={`flex-auto justify-center rounded overflow-hidden shadow-lg ${backgroundClass}`}>
      <div className="w-full p-4">
        {children}
      </div>
    </div>
  );
}
 
export default Card;