import React, { useCallback, useReducer } from "react";
import { INPUT_CHANGE, POST_IMAGE, RESET_DATA } from "../utils/actions";

const formReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case RESET_DATA:
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };

    case POST_IMAGE:
      return {
        ...state,
        postImage: action.payload,
      };

    default:
      return state;
  }
};

export const useForm = (initialInputs, initialValidation) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidation,
  });

  const formHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: INPUT_CHANGE,
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const resetData = useCallback((inputs, formValidation) => {
    dispatch({
      type: RESET_DATA,
      inputs: inputs,
      formIsValid: formValidation,
    });
  }, []);

  //I wanted to create a seperate state handler for the image upload...
  const uploadImage = useCallback((e) => {
    console.log("hits");
    dispatch({
      type: POST_IMAGE,
      payload: e.target.files[0],
    });
  });

  return [formState, formHandler, resetData, uploadImage];
};
