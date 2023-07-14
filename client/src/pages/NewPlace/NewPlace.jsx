import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/button";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_FILE,
} from "../../utils/validators";
import { INPUT_CHANGE } from "../../utils/actions";
import { useForm } from "../../hooks/FormHook";

const NewPlace = () => {
  const [imgFile, setImgFile] = useState("");

  console.log(imgFile);

  const [formState, formHandler, uploadImage] = useForm(
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
      image: {
        value: "",
        isValid: false,
      },
    },
    false,
    ""
  );

  console.log(formState);

  const placeSumbitHandler = (e) => {
    e.preventDefault();
  };
  // console.log(formState.isValid);

  // const handleImageChange = (e) => {
  //   console.log("works");
  //   setImgFile(e.target.files[0]);
  // };

  return (
    <div className="mt-5 h-screen w-full ">
      <form onSubmit={placeSumbitHandler} className="w-[50%] mx-auto">
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
          id="address"
          element="input"
          type="text"
          label="Address"
          errorText="Add the address, you will help others see it on the map!"
          validators={[VALIDATOR_REQUIRE()]}
          placeholder={"Describe your wonderful trip"}
          onInput={formHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Trip description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a detailed description"
          onInput={formHandler}
        />

        <Input
          id="image"
          element="input"
          label="Image"
          type="file"
          errorText="Please upload an image of your trip"
          changeImg={setImgFile}
          // onChange={handleImageChange}
          validators={[VALIDATOR_REQUIRE()]}
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
