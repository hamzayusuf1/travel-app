import React, { useReducer, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/button";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_FILE,
} from "../../utils/validators";
import Auth from "../../utils/Auth";
import { INPUT_CHANGE, POST_IMAGE } from "../../utils/actions";
import { useForm } from "../../hooks/FormHook";
import { ADD_PLACE } from "../../utils/mutations";

const NewPlace = () => {
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files

    uploadImage();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [addPlace, { error }] = useMutation(ADD_PLACE);

  const [imgFile, setImgFile] = useState("");

  const imgReducer = (state, action) => {
    switch (action.type) {
      case POST_IMAGE:
        return {
          ...state,
          postImage: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(imgReducer, {
    postImage: "",
  });

  const [formState, formHandler, _, uploadImage] = useForm(
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

  const placeSumbitHandler = async (e) => {
    e.preventDefault();

    console.log(formState.postImage);

    try {
      const res = await fetch("127.0.0.1:4000/upload");

      console.log(res.json(res));
      // const { data } = await addPlace({
      //   variables: {
      //     title: formState.inputs.title.value,
      //     description: formState.inputs.description.value,
      //     address: formState.inputs.address.value,
      //   },
      // });
      // await fetch("http://localhost:4000/upload", {
      //   method: "POST",
      //   body: formState.postImage,
      // });

      // toast.success("Post added successfully");
      // navigate("/home/recents");
      // navigate(0);
    } catch (error) {
      console.error(JSON.stringify(error));
      // setErr(error.message);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl text-black  text-center">
        Like To Share Your Recent Adventure?{" "}
      </h1>
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

        {/* <Input
          id="image"
          element="input"
          label="Image"
          type="file"
          errorText="Please upload an image of your trip"
          changeImg={uploadImage}
          // onChange={handleImageChange}
          validators={[VALIDATOR_REQUIRE()]}
          onInput={formHandler}
        /> */}
        <Input
          id="description"
          element="textarea"
          label="Trip description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a detailed description"
          onInput={formHandler}
        />

        <div {...getRootProps()}>
          <input {...getInputProps()} id="image" label="image" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>

        {/* <input type="file" onChange={uploadImage} /> */}

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
