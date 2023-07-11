import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

import { useForm } from "../../hooks/FormHook";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/Auth";

const AuthForm = () => {
  const { login } = useContext(AuthContext);

  const [authMode, setAuthMode] = useState(true);

  console.log(authMode);

  // const [loginUser, { error }] = useMutation(LOGIN_USER);
  const [addUser, { error2 }] = useMutation(ADD_USER);

  const [formState, formHandler, resetData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const signUp = () => {
    if (authMode) {
      resetData(
        {
          ...formState.inputs,
          name: null,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      resetData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setAuthMode(!authMode);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();

    console.log(formState.inputs);
    console.log("hello");

    if (authMode) {
      // try {
      //   const { data } = await loginUser({
      //     variables: {
      //       email: formState.inputs.email.value,
      //       password: formState.inputs.password.value,
      //     },
      //   });
      //   Auth.login(data?.login?.token);
      // } catch (error) {
      //   console.error(error);
      //   // toast.error(error[0].message);
      // }
    } else {
      try {
        const { data } = await addUser({
          variables: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            username: formState.inputs.username.value,
          },
        });
        console.log(data);
        Auth.login(data?.login?.token);
      } catch (error) {
        console.error(error);
      }
    }

    // if (authMode) {
    // } else {
    //   try {
    //     const { data } = await addUser({
    //       variables: {},
    //     });
    //   } catch (error) {}
    // }
  };

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="mt-6 w-3/5 h-3/rounded-lg   flex flex-col items-center gap-6">
        <img
          className="w-[100px] bg-darkLightBlue border-charcoal border-2 rounded-circular"
          src={"/images/logo.png"}
          alt=""
        />
        <h2
          className="px-2 font-montserrat font-bold text-2xl"
          onClick={() => console.log(Auth.getToken())}
        >
          Welcome Back
        </h2>

        <p className="font-rubik max-w-[450px] text-center">
          Use our simple login method to access all the great features in our
          app!
        </p>

        <form onSubmit={authSubmitHandler}>
          {!authMode && (
            <Input
              id="username"
              type="text"
              label="Your username"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your username"
              onInput={formHandler}
            />
          )}
          <Input
            id="email"
            element="input"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address"
            onInput={formHandler}
          />
          <Input
            id="password"
            type="password"
            onInput={formHandler}
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid passowrd, minimum 5 characters"
            onInput={formHandler}
          ></Input>

          <div className="mt-6">
            <Button
              type="sumbit"
              value={authMode ? "Login" : "SignUp"}
              variant="contained"
              disabled={formState.isValid}
              onClick={() => {}}
            />
            <Button
              value={authMode ? "Switch to SignUp" : "Switch to Login"}
              variant="outlined"
              disabled={true}
              onClick={signUp}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
