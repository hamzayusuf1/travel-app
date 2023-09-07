import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Input from "../../components/Input/Input";
import CustomButton from "../../components/Button/button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import { useForm } from "../../hooks/FormHook";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { GET_POSTS, QUERY_USERS } from "../../utils/queries";
import { UPDATE_PLACE } from "../../utils/mutations";

///QUERY ALL PLACES AND LET THE PAGE SEARCH  AND FILTER FOR THE RIGHT ONE

const UpdatePlace = (props) => {
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_POSTS);

  const [updatePlaces, { error }] = useMutation(UPDATE_PLACE);

  const { placeId } = useParams();

  const handleUpdate = async (e) => {
    e.preventDafault();

    try {
      const { data } = await updatePlaces({
        variables: {
          id: placeId,
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A3A6AC",
      },
      secondary: {
        main: "#A3A6AC",
      },
    },
  });

  // const [loading, setLoading] = useState(true);

  const place = data?.places.find((placeObject) => placeObject._id == placeId);

  const [formState, formHandler, resetData, uploadImage] = useForm(
    {
      title: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    false,
    ""
  );

  useEffect(() => {
    if (place) {
      resetData(
        {
          title: {
            value: place.title,
            isValid: true,
          },
          description: {
            value: place.description,
            isValid: true,
          },
        },
        true
      );
    }
    // setLoading(false);
  }, [placeId, resetData, place]);

  if (!place) {
    return (
      <h2 className="text-xl text-black font-bold">
        Couldnt find this paticular place, maybe try another?
      </h2>
    );
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-xl text-black font-bold">loading...</h2>
      </div>
    );
  }

  return (
    // formState.inputs.title.value &&
    <form onSubmit={handleUpdate} action="" className="w-[50%] mx-auto">
      <Input
        id="title"
        element={"input"}
        type="text"
        label="Trip title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={place?.title}
        initialValid={formState.inputs.title.isValid}
        // valid={true}
        onInput={formHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Trip description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description"
        initialValue={place?.description}
        initialValid={formState.inputs.description.isValid}
        // valid={true}
        onInput={formHandler}
      />

      <div className="flex justify-center">
        <CustomButton
          variant="contained"
          type="sumbit"
          value="UPDATE PLACE"
          disabled={formState.isValid}
        >
          Update Place
        </CustomButton>
        <ThemeProvider theme={theme}>
          <Link to={"/home/recents"}>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Link>
        </ThemeProvider>
      </div>
    </form>
  );
};

export default UpdatePlace;
