import React, { useReducer, useEffect } from "react";
import { CgAddR } from "react-icons/cg";

import { TITLE_INPUT } from "../../../utils/actions";
import { validate } from "../../../utils/validators";

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
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || " ",
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const handleChange = (e) => {
    dispatch({
      type: TITLE_INPUT,
      value: e.target.value,
      validators: props.validators,
    });
  };
  const element =
    props.element === "textarea" ? (
      <textarea
        className={
          inputState.isValid
            ? "rounded-lg text-sm font-medium  border border-grey-400 placeholder-grey-400 w-full p-1.5 h-40"
            : "rounded-lg text-sm font-medium  border border-red-400  bg-red-100 placeholder-grey-400 w-full p-1.5 h-40"
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
              ? "rounded-lg text-sm font-medium  border border-grey-400 placeholder-grey-400 w-full p-1.5"
              : "rounded-lg text-sm font-medium  border border-red-400  bg-red-100 placeholder-grey-400 w-full p-1.5"
          }
          type={props.type}
          placeholder={props.placeholder}
          onChange={handleChange}
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
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
