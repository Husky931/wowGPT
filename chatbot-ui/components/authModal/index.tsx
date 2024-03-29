import React, { useState } from 'react';

// import Box from "@mui/material/Box"
// import Dialog from "@mui/material/Dialog"
import Image from 'next/image';

import logoSignup from '../../public/logo_blue2_signup.png';
import Login from './Login';
import Register from './Register';

// import { showAuthModal } from "../../signals/showAuthModal"

const AuthModal = () => {
  const [displayRegister, setDisplayRegister] = useState<boolean>(false);

  // const handleCloseClick = (e: any) => {
  //     e.preventDefault()
  //     showAuthModal.value = false
  //     setDisplayRegister(false)
  // }

  return (
    <div className="w-screen h-full absolute top-0 left-0 flex justify-center items-center ">
      <div className="max-w-[333px] sm:max-w-[400px] w-full flex flex-col justify-center items-center p-5 mx-2 sm:p-10 gap-y-4 bg-[#ffffff] rounded-3xl">
        <div className="min-h-[53px]">
          <img
            src="/logo.png"
            style={{ width: '120px', height: '52px' }}
            alt="logo"
          />
        </div>
        {displayRegister ? (
          <Register setDisplayRegister={setDisplayRegister} />
        ) : (
          <Login setDisplayRegister={setDisplayRegister} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
