import React from "react";
import { Link, useParams } from "react-router-dom";
import Input from "../components/Input/Input";
import Button from "../components/Button/button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../../utils/validators";
import { useForm } from "../../hooks/FormHook";

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
  const { placeId } = useParams();
  console.log(placeId);

  const place = DUMMY_DATA.filter((placeObject) => placeObject.id == placeId);

  const [formState, formHandler] = useForm(
    {
      title: {
        value: place.title,
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
    },
    true
  );

  console.log(place);

  if (!place) {
    return <h2>Couldnt find this paticular place, maybe try another?</h2>;
  }

  return (
    <form action="">
      <Input
        id="title"
        validators={[VALIDATOR_REQUIRE()]}
        label="Trip title"
        element={"input"}
        type="text"
        errorText="Please enter a valid title"
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
        valid={true}
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
        valid={true}
        onInput={formHandler}
      />
      <Button add={false} type="sumbit"></Button>
    </form>
  );
};

export default UpdatePlace;
