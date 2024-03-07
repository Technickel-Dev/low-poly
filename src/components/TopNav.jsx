const TopNav = () => {
  return ( 
    <nav className="flex items-center justify-between flex-wrap bg-red-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
      <img src="triple_resolution_logo_white.svg" alt="Logo" className="fill-current h-8 w-8 mr-2 w-54 h-54" />
        <span className="font-semibold text-xl tracking-tight">Triple Resolution</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a href="/" className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-500 mr-4">
            Home
          </a>
        </div>
      </div>
    </nav>
  );
}
 
export default TopNav;