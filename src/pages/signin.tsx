import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Signin: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { signin } = useContext(AuthContext);

  const handleSignin = (data: FormValues) => {
    try {
      signin(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(handleSignin)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} type="email" id="email" />

        <label htmlFor="password">Password</label>
        <input {...register("password")} type="password" id="password" />
        <button>Entrar</button>
      </form>
    </>
  );
};

export default Signin;
