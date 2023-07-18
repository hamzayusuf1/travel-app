import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Input from "../../components/Input/Input";
import CustomButton from "../../components/Button/button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import { useForm } from "../../hooks/FormHook";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const DUMMY_DATA = [
  {
    id: 1,
    title: "empire state building",
    description: "One of the most tallest skyscrapers in the world",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
    location: {
      lat: "40.7484405",
      lng: "-73.9878531",
    },
  },
  {
    id: 2,
    title: "empire state building",
    description: "One of the most tallest skyscrapers in the world",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
    location: {
      lat: "40.7484405",
      lng: "-73.9878531",
    },
  },
];

const UpdatePlace = (props) => {
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

  const [loading, setLoading] = useState(true);

  const { placeId } = useParams();
  console.log(placeId);

  const place = DUMMY_DATA.find((placeObject) => placeObject.id == placeId);

  const [formState, formHandler, resetData] = useForm(
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
    setLoading(false);
  }, [placeId, resetData]);

  console.log(place);

  if (!place) {
    return <h2>Couldnt find this paticular place, maybe try another?</h2>;
  }

  if (loading) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }

  return (
    // formState.inputs.title.value &&
    <form action="" className="w-[50%] mx-auto">
      <Input
        id="title"
        element={"input"}
        type="text"
        label="Trip title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        initialValue={formState.inputs.title.value}
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
        initialValue={formState.inputs.description.value}
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
