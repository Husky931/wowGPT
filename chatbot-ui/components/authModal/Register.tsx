import React, { useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { setToken } from '@/pages/api/auth/js-cookie';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// import { setToken } from "../../pages/api/auth/js-cookie"

type Inputs = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

const Register: React.FC<{
  setDisplayRegister: (display: boolean) => void;
}> = ({ setDisplayRegister }) => {
  const [show, setShow] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const password = useRef({});
  password.current = watch('password', '');

  const registerUser: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const submitData = await fetch(
        `https://lingo3d.com/strapi/api/auth/local/register`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            password: data.password,
            email: data.email,
            username: data.username,
          }),
        },
      );

      const res = await (submitData as Response).json();

      if (res.error) {
        setShow(true);
        setServerError(res.error.message);
        return;
      }

      setToken(res);
    } catch (error) {
      console.log(error);
      alert(
        'There was an error connecting to the server. Please try again later.',
      );
    }
  };

  return (
    <>
      <div className="text-[#262546] text-center">
        <div className="text-[22px] ">Create your account</div>
        <div>And start playing with our AI</div>
      </div>

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            fullWidth
            inputRef={ref}
            placeholder="email"
            type="email"
            value={value}
            onChange={onChange}
            error={!!errors.email}
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
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
            InputProps={{
              sx: {
                color: '#262546',
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
          />
        )}
      />
      <Controller
        control={control}
        name="username"
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            fullWidth
            inputRef={ref}
            placeholder="username"
            type="text"
            value={value}
            onChange={onChange}
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
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
            InputProps={{
              sx: {
                color: '#262546',
                fontFamily: 'Varela Round, sans-serif !important',
              },
            }}
          />
        )}
      />
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
                fontFamily: '__Varela_Round_4d1704 !important',
              },
            }}
            InputProps={{
              sx: {
                color: '#262546',
                fontFamily: '__Varela_Round_4d1704 !important',
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
      <Controller
        control={control}
        name="passwordConfirm"
        rules={{
          required: true,
          minLength: 6,
          validate: (val: string) => {
            if (watch('password') != val) {
              return val === password.current || 'Passwords do not match';
            }
          },
        }}
        render={({ field: { onChange, value, ref } }) => (
          <TextField
            fullWidth
            inputRef={ref}
            placeholder="confirm password"
            type="password"
            value={value}
            onChange={onChange}
            error={!!errors.passwordConfirm}
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
                fontFamily: '__Varela_Round_4d1704 !important',
              },
            }}
            InputProps={{
              sx: {
                color: '#262546',
                fontFamily: '__Varela_Round_4d1704 !important',
              },
            }}
          />
        )}
      />
      {errors.passwordConfirm && (
        <p className="text-[#262546]">{errors.passwordConfirm.message}</p>
      )}

      {show ? (
        <span className="w-full text-center text-red-900 border-[1px] border-red-900 rounded py-2">
          {serverError}
        </span>
      ) : null}
      <Button
        variant="contained"
        fullWidth
        sx={{
          paddingY: '10px !important',
          marginTop: '12px !important',
          background: '#f8d141 !important',
          color: '#262546',
          fontWeight: '600',
          borderRadius: '12px !important',
        }}
        onClick={handleSubmit(registerUser)}
      >
        Sign Up
      </Button>
      <div className="w-full flex flex-col justify-center items-center mt-[20px]">
        <div className="text-[##62546]">Already have an account?</div>
        <div
          onClick={() => setDisplayRegister(false)}
          className="text-[#262546] font-semibold underline cursor-pointer"
        >
          Log in
        </div>
      </div>
    </>
  );
};

export default Register;
