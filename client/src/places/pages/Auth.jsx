import React, { useContext, useState } from "react";

import Input from "../components/Input/Input";
import Button from "../components/Button/button";
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
        value: "hello",
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
    login();
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-3/5 h-3/6 border-2 border-black rounded-lg">
        <h2 className="border-b-2 border-black px-2">Login Required</h2>
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
            onInput={formHandler}
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid passowrd, minimum 5 characters"
          ></Input>

          <Button
            type="sumbit"
            value={loggedIn ? "Login" : "SignUp"}
            variant="contained"
            disabled={formState.isValid}
          />
          <Button
            value={loggedIn ? "Switch to SignUp" : "Switch to Login"}
            variant="outlined"
            disabled={true}
            onClick={signUp}
          />
        </form>
      </div>
    </div>
  );
};

export default Auth;
