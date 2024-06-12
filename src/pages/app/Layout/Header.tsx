import { useState, useRef, useEffect } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  const menu = [
    {
      label: "Pokedex",
      value: "/",
    },
    {
      label: "Pokebicho",
      value: "/pokebicho",
    },
  ];

  return (
    <div className="h-[10vh] bg-gradient-to-r from-red-700 to-red-500 text-white p-4 flex justify-between items-center">
      <div className="text-2xl flex items-center gap-4">
        <img src="logo.svg" alt="logo" width={40} />
        PokeTest
      </div>

      <div className="hidden md:flex gap-2">
        {menu.map((item: { label: string; value: string }, key: number) => {
          return (
            <Link
              to={item.value}
              key={key}
              className="hover:bg-white hover:text-zinc-900 p-2 rounded-md transition-all duration-150 cursor-pointer"
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div
        className="hover:bg-white hover:text-zinc-900 p-2 rounded-md md:hidden transition-all duration-150 cursor-pointer z-20"
        onClick={(event) => {
          toggleMenu();
          event.stopPropagation();
        }}
      >
        {menuOpen ? (
          <XMarkIcon className="w-6 cursor-pointer" />
        ) : (
          <Bars3Icon className="w-6 cursor-pointer" />
        )}
      </div>

      <div
        ref={menuRef}
        className={`h-full w-1/2 bg-red-500 md:hidden flex flex-col justify-center items-center gap-2 absolute top-0 ${
          menuOpen ? "right-0" : "-right-[24rem]"
        } transition-all duration-150 z-10`}
      >
        {menu.map((item, key) => (
          <Link
            to={item.value}
            key={key}
            className="hover:bg-white hover:text-zinc-900 text-xl p-2 rounded-md transition-all duration-150"
            onClick={toggleMenu}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
