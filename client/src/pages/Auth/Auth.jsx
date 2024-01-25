import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";

import { useForm } from "../../hooks/FormHook";
import { AppContext } from "../../App";
import { LOGIN_USER, ADD_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/Auth";

const AuthForm = () => {
  //useState Configuration
  const [userData, setUserData] = useState({});

  const [authMode, setAuthMode] = useState(true);
  const [err, setErr] = useState("");

  //setting up global context to save user login data
  const { user, setUser } = useContext(AppContext);
  console.log(user);

  //useNavigate config
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  //Queries and mutations Configuration
  const [loginUser, { error }] = useMutation(LOGIN_USER);
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
    if (!authMode) {
      resetData(
        {
          ...formState.inputs,
          username: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      resetData(
        {
          ...formState.inputs,
          username: {
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
      try {
        const { data } = await loginUser({
          variables: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          },
        });
        setUser(data?.login?.user);
        console.log(user);
        localStorage.setItem("uuid", data?.login?.user._id);
        localStorage.setItem("job", data?.login?.user.job);
        localStorage.setItem("username", data?.login?.user.username);
        await Auth.login(data?.login?.token);
        navigate("/home/recents");
      } catch (error) {
        console.log(JSON.stringify(error));
        // toast.error(error[0].message);
        setErr(error.message);
      }
    } else {
      try {
        const { data } = await addUser({
          variables: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            username: formState.inputs.username.value,
            job: formState.inputs.job.value,
          },
        });
        localStorage.setItem("uuid", data?.login?.user._id);
        Auth.login(data?.addUser?.token);
      } catch (error) {
        console.log(JSON.stringify(error));
        setErr(error.message);
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
    <div className="h-full w-full flex justify-center">
      <div className="mt-6 w-3/5 h-3/5 rounded-lg   flex flex-col items-center gap-6">
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
          {!authMode && (
            <Input
              id="job"
              type="text"
              label="Your job title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your job title"
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
          {err && (
            <div className="border-2 rounded-lg border-red-400 p-1 my-3 bg-red-100">
              <p className="text-center text-red-500 text-lg font-bold">
                {err}
              </p>
            </div>
          )}
          <div className="mt-6 flex flex-col gap-6">
            <div>
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
            <Button
              value={"Cancel"}
              variant="outlined"
              disabled={true}
              onClick={handleCancel}
              textColor="black"
              borderSize="2"
              borderColor="black"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
