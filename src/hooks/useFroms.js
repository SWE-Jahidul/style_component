import { useState } from "react";
import { deepClone, isEmpty } from "../utlils/object-utlis";

/**
 * @typedef {Object} Param
 * @property {Object} init
 * @property {(Object | boolean)} validate
 * Create forms using this useFrom hooks
 * @param {*} param0
 * @returns
 */

const useFrom = ({ init, validate }) => {
  const [state, setState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value } = e.target;

    const oldState = deepClone(state);
    oldState[key].value = value;

    const {  errors  } = getErrors()

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }
    setState(oldState);
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    const oldState = deepClone(state);
    oldState[name].focused = true;

    if (!oldState[name].touched) {
      oldState[name].touched = true;
    }

    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;

    const {  errors  } = getErrors();

    const oldState = deepClone(state);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    oldState[key].focused = false;
    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { errors, hasError, values } = getErrors();
    cb({
      hasError,
      errors,
      values,
      touched:mapStateToKeys(state, "touched"),
      focused:mapStateToKeys(state, "focused"),
    });
  };


  const clear = () =>{
    const newState = mapValuesToState(init,true)
    setState(newState);
  }

  const getErrors = () => {
    let hasError = null,
      errors = null;
    const values = mapStateToKeys(state, "values");

    if (typeof validate === "boolean") {
      hasError === validate;
      const { errors } = validate(values);
    } else if (typeof validate === "funciton") {
      const { errors: ErrorsFromCB } = validate(values);
      hasError = !isEmpty(ErrorsFromCB);
      errors = ErrorsFromCB;
    } else {
      throw new Error("validate property must be boolean or function ");
    }
    return {
      errors,
      hasError,
      values,
    };
  };

  return {
    fromState: state,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear
  };
};

export default useFrom;

// Helper Function
const mapValuesToState = (values,shouldClear = false) => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key] = {
      value:shouldClear ? "" : values[key],
      error: "",
      focused: false,
      touched: false,
    };
    return acc;
  }, {});
};

const mapStateToKeys = (state, key) => {
  return Object.keys(state).reduce((acc, cur) => {
    acc[cur] = state[cur][key];
    return acc;
  }, {});
};
