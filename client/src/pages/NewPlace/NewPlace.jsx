import React, { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";

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
      // image: {
      //   value: "",
      //   isValid: false,
      // },
    },
    false,
    ""
  );

  const placeSumbitHandler = async (e) => {
    e.preventDefault();

    console.log(formState.postImage);

    const formData = new FormData();
    formData.append("file", formState.postImage);

    // return await fetch("http://localhost:4000/upload", {
    //   method: "POST",
    //   mode: "no-cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //   },
    //   body: formData,
    // })
    //   .then((res) => {
    //     if (!res.ok)
    //       throw `Server error: ${res.status} ${res.statusText} ${res.url}`;
    //     return res.json();
    //   })
    //   .then((result) => {
    //     console.log(result.message);
    //   })
    //   .catch((err) => {
    //     console.debug("Errors in fetch,", err);
    //   });

    try {
      const { data } = await addPlace({
        variables: {
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
        },
      });
      toast.success("Post added successfully");
      navigate("/home/recents");
      navigate(0);
    } catch (error) {
      console.error(JSON.stringify(error));
      // setErr(error.message);
    }
  };

  //Sending image function
  // const handleSendingImage = async (e) => {
  //   e.preventDefault();
  //   console.log("hits");
  //   console.log(formState.postImage);

  //   const formData = new FormData();
  //   formData.append("file", formState.postImage);

  //   // try {
  //   //   var requestOptions = {
  //   //     method: "POST",
  //   //     body: formData,
  //   //     redirect: "follow",
  //   //   };

  //   //   fetch("http://localhost:4000/upload", requestOptions)
  //   //     .then((response) => {
  //   //       return response.json();
  //   //     })
  //   //     .then((result) => console.log(result))
  //   //     .catch((error) => console.log("error", error));
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }

  //   return await fetch("http://localhost:4000/upload", {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Credentials": true,
  //     },
  //     body: formData,
  //   })
  //     .then((res) => {
  //       if (!res.ok)
  //         throw `Server error: ${res.status} ${res.statusText} ${res.url}`;
  //       return res.json();
  //     })
  //     .then((result) => {
  //       console.log(result.message);
  //     })
  //     .catch((err) => {
  //       console.debug("Errors in fetch,", err);
  //     });

  //   // if (!response.ok) {
  //   //   return response.json().then((res) => {
  //   //     // setErrorMessage(res.message);
  //   //     console.log(res.message);
  //   //   });
  //   // }
  // };

  return (
    <div className="h-screen w-full mt-20">
      <div className="mb-10">
        <h2 className="font-rubik text-4xl font-semibold text-center">
          Share your recent trip with others!
        </h2>
      </div>
      <form onSubmit={placeSumbitHandler} className="sm:w-[70%] p-5 mx-auto">
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
          errorText="Please add the full address, it will help others see it on the map!"
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
        {/* 
        <Input
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

        <div className="rounded-lg p-3 flex flex-col">
          <label className="mb-2 text-lg font-semibold text-black">
            Add an image
          </label>
          <input type="file" onChange={uploadImage} />
        </div>

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
