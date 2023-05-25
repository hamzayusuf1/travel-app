import React from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/button";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";
import { INPUT_CHANGE } from "../utils/actions";
import { useCallback } from "react";
import { useForm } from "../hooks/FormHook";

const NewPlace = () => {
  const [formState, formHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSumbitHandler = (e) => {
    e.preventDefault();
  };
  // console.log(formState.isValid);

  return (
    <div className="mt-5 bg-slate-200 h-screen w-full">
      <form onSubmit={placeSumbitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Trip title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          placeholder={"Describe your wonderful trip"}
          onInput={formHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Trip description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description"
          onInput={formHandler}
        />
        <Button
          type="sumbit"
          value="Add place"
          variant="contained"
          disabled={formState.isValid}
        ></Button>
      </form>
    </div>
  );
};

export default NewPlace;
