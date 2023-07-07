import React, { useContext, useState } from "react";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";
import { useForm } from "../../hooks/FormHook";
import { AuthContext } from "../../context/AuthContext";

const Auth = () => {
  const { login } = useContext(AuthContext);

  const [loggedIn, setLoggedIn] = useState(true);

  console.log(loggedIn);

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
    if (loggedIn) {
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
    setLoggedIn(!loggedIn);
  };

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
    console.log("works");
    login();
  };

  return (
    <div className="h-screen w-full flex justify-center">
      <div className="mt-6 w-3/5 h-3/rounded-lg   flex flex-col items-center gap-6">
        <img
          className="w-[100px] bg-darkLightBlue border-charcoal border-2 rounded-circular"
          src={"/images/logo.png"}
          alt=""
        />
        <h2 className="px-2 font-montserrat font-bold text-2xl">
          Welcome Back
        </h2>

        <p className="font-rubik max-w-[450px] text-center">
          Use our simple login method to access all the great features in our
          app!
        </p>

        <form onSubmit={authSubmitHandler}>
          {!loggedIn && (
            <Input
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name"
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
              value={loggedIn ? "Login" : "SignUp"}
              variant="contained"
              disabled={formState.isValid}
              onClick={() => {
                console.log(formState.inputs);
              }}
            />
            <Button
              value={loggedIn ? "Switch to SignUp" : "Switch to Login"}
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

export default Auth;
