import React from 'react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { setToken } from '@/pages/api/auth/js-cookie';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type Inputs = {
  username: string;
  password: string;
};

const Login: React.FC<{ setDisplayRegister: (display: boolean) => void }> = ({
  setDisplayRegister,
}) => {
  const [show, setShow] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const loginUser: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const submitData = await fetch(
        `https://luxifyverse.com/strapi/api/auth/local`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            password: data.password,
            identifier: data.username,
          }),
        },
      );
      const res = await submitData.json();

      if (res.error) {
        if (res.error.message === 'Your account email is not confirmed') {
          return window.location.assign(
            `${process.env.NEXT_PUBLIC_LINGO_HOMEPAGE}/verify-email`,
          );
        }

        setShow(true);
        setServerError(res.error.message);
        return;
      }

      setToken(res);
    } catch (error) {
      alert(
        'There was an error connecting to the server. Please try again later.',
      );
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-[#262546] text-center">
        <div className="text-[22px] ">Welcome</div>
        <div>Login in and ask our AI any question</div>
      </div>

      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            fullWidth
            inputRef={ref}
            value={value}
            onChange={onChange}
            placeholder="username or email"
            error={!!errors.username}
            variant="standard"
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: '#262546 !important',
              },
              '&:hover .MuiInput-underline:before': {
                borderBottomColor: '#262546 !important',
              },
              '&.Mui-focused .MuiInput-underline:before': {
                borderBottomColor: '#262546 !important',
              },
              '& .MuiInputBase-input': {
                paddingBottom: '8px !important',
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#262546',
                // fontFamily: '__Varela_Round_4d1704 !important',
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
            InputProps={{
              sx: {
                color: '#262546',
                // fontFamily: '__Varela_Round_4d1704 !important',
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
          />
        )}
      />
      {errors.username && (
        <span className="text-[#262546]">{errors.username.message}</span>
      )}
      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            fullWidth
            inputRef={ref}
            placeholder="password"
            type="password"
            value={value}
            onChange={onChange}
            error={!!errors.password}
            variant="standard"
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: '#262546 !important',
              },
              '&:hover .MuiInput-underline:before': {
                borderBottomColor: '#262546 !important',
              },
              '&.Mui-focused .MuiInput-underline:before': {
                borderBottomColor: '#262546 !important',
              },
              '& .MuiInputBase-input': {
                paddingBottom: '8px !important',
              },
            }}
            InputLabelProps={{
              sx: {
                color: '#262546',
                // fontFamily: '__Varela_Round_4d1704 !important',
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
            InputProps={{
              sx: {
                color: '#262546',
                // fontFamily: '__Varela_Round_4d1704 !important',
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
          />
        )}
      />
      {errors.password && errors.password.type === 'minLength' && (
        <span className="text-[#262546]">
          Minimum password length is 6 charachters
        </span>
      )}
      {show ? (
        <span className="w-full text-center text-red-900 border-[1px] border-red-900 rounded py-2">
          {serverError}
        </span>
      ) : null}
      {/* <div
        className="w-full text-[#1876d1] cursor-pointer"
        onClick={() => {
          showAuthModal.value = false;
          showForgotPassModal.value = true;
        }}
      >
        Forgot password?
      </div> */}

      <Button
        variant="contained"
        fullWidth
        sx={{
          paddingY: '10px !important',
          marginTop: '12px !important',
          background: '#f8d141 !important',
          color: '#262546',
          fontWeight: '600 !important',
          borderRadius: '12px !important',
        }}
        onClick={handleSubmit(loginUser)}
      >
        Log in
      </Button>
      {/* <div className="w-full text-[#262546] mt-[20px]">
        <div className="text-center">Don&apos;t have an account? </div>
        <div
          onClick={() => setDisplayRegister(true)}
          className="pointer-cursor text-[#262546] font-semibold underline cursor-pointer text-center"
        >
          Sign up!
        </div>
      </div> */}

      {/* <div className="w-full flex items-center">
                <div className="flex-1 bg-gray-300 h-0.5"></div>
                <div className="text-center mx-5 ">OR</div>
                <div className="flex-1 bg-gray-300 h-0.5"></div>
            </div>
            <Box
                onClick={() => googleSignIn()}
                className="w-full flex border-[rgba(0,0,0,0.60)] border-solid border-[0.5px] py-1 px-2 rounded cursor-pointer"
            >
                <GoogleIcon />
                <div className="flex-1 text-center">Continue with Google</div>
            </Box> */}
    </>
  );
};

export default Login;
