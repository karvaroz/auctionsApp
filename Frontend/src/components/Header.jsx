import React from "react";
import { RiAuctionLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useGlobalState } from "../context/AuthContext";

const Header = () => {
  const navigate = useNavigate()
  const { user, setIsAuthenticated } = useGlobalState();

  const logOutUser = () => {
    Swal.fire({
      title: `Do you want to log out?`,
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,

    }).then((result) => {
      if (result.isConfirmed) {
        setIsAuthenticated(false)
        localStorage.clear();
        navigate("/")
      }
    });

  }

  return (
    <nav className='mx-auto px-4 h-16 min-h-full bg-gray-800 flex items-center justify-center min-w-fit'>
      <div className='flex-shrink-0'>
        <RiAuctionLine className='h-8 w-8 text-white' />
      </div>
      <div className='md:block'>
        <div className='ml-10 flex items-baseline space-x-4'>
          <Link
            to='/home'
            className='bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
          >
            Home
          </Link>
          {
            user?.role == "Admin" && <Link
              to='/create'
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
            >
              Add Ad
            </Link>
          }

          <button
            onClick={() => logOutUser()}
            type='button'
            className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium bg-red-400'
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
