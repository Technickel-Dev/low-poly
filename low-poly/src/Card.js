const Card = ({ children }) => {
  return ( 
    <div className="flex-auto justify-center bg-white rounded overflow-hidden shadow-lg">
      <div className="w-full px-6 py-4">
        {children}
      </div>
    </div>
  );
}
 
export default Card;