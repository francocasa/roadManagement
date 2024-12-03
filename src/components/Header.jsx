import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { /*Cart3, */ Person } from "react-bootstrap-icons";
const Header = () => {
  const location = useLocation();

  const navRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const menuClasses = `items-center ${
    !isMenuOpen ? "hidden" : ""
  } justify-between w-full md:w-auto md:flex-grow md:flex md:order-1`;

  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-md">
      <div className="container flex flex-wrap items-center justify-between mx-auto p-3 md:p-3 lg:p-4">
        <div className="-mb-1 lg:w-72">
          <img src="/Logo.png" alt="Gestión de vias" className="w-36" />
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        <div className={menuClasses} ref={navRef}>
          <ul className="flex flex-col p-2 md:p-0 mt-2 mb-3 font-medium text-sm border border-gray-100 rounded-lg md:space-x-0 mx-auto rtl:space-x-reverse md:flex-row md:my-0 md:border-0 lg:text-base">
            <li>
              <Link
                to="/"
                className="block w-32 py-2 px-3 text-white rounded hover:bg-blue-100 transition-colors"
              >
                Mapas
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="block w-32 py-2 px-3 text-white rounded hover:bg-blue-100 transition-colors"
              >
                Listados
              </Link>
            </li>
          </ul>

          <div className="flex justify-between items-center md:w-60 lg:w-72 gap-2 w-full">
            <Link to="/profile">
              <Person
                color="white"
                className="cursor-pointer text-2xl lg:text-[30px]"
              />
            </Link>
            {/* <Link to="/cart" className="relative">
              <Cart3
                color="white"
                className="cursor-pointer text-xl lg:text-[26px]"
              />
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
