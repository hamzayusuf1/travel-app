import React, { useReducer, useEffect } from "react";
import { CgAddR } from "react-icons/cg";

import { TITLE_INPUT } from "../../utils/actions";
import { validate } from "../../utils/validators";

import "../Input/input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case TITLE_INPUT:
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };

    default:
      return state;
  }
};

const Input = (props) => {
  // console.log(props.onChange);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  //wont run because e has to be directly run from the onchange
  const handleImageChange = (e) => {
    console.log("works");
    props.changeImg(e.target.files[0]);
  };

  const handleChange = (e) => {
    dispatch({
      type: TITLE_INPUT,
      value: e.target.value,
      validators: props.validators,
    });

    // if (props.type === "file") {
    //   // props.changeImg(e.target.files[0]);
    //   props.changeImg(e.target.files[0]);
    // }
  };

  const element =
    props.element === "textarea" ? (
      <textarea
        className={
          inputState.isValid
            ? "rounded-lg text-sm font-medium  border border-grey-400 placeholder-grey-400 w-full p-1.5 h-40 min-w-[300px]"
            : "rounded-lg text-sm font-medium  border border-red-400  bg-red-100 placeholder-grey-400 w-full p-1.5 h-40 min-w-[300px]"
        }
        rows={props.rows || 3}
        id={props.id}
        onChange={handleChange}
        value={inputState.value}
      />
    ) : (
      <>
        <input
          id={props.id}
          className={
            inputState.isValid
              ? "rounded-lg text-sm font-medium  border border-grey-400 placeholder-grey-400 w-full p-1.5 min-w-[300px]"
              : "rounded-lg text-sm font-medium  border border-red-400  bg-red-100 placeholder-grey-400 w-full p-1.5 min-w-[300px]"
          }
          type={props.type}
          placeholder={props.placeholder}
          onChange={(e) => {
            handleChange(e);
            {
              props.changeImg && props.changeImg(e);
            }
          }}
          value={inputState.value}
        />
      </>
    );

  return (
    <div className="mx-3">
      <label
        htmlFor="Add trip"
        className="mb-2 text-xl font-medium text-slate-500"
      >
        {props.label}
      </label>

      {element}
      {!inputState.isValid && <p className="text-sm">{props.errorText}</p>}
    </div>
  );
};

export default Input;
