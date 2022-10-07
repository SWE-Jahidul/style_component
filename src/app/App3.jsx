import { useState } from "react";

import InputGroup from "../components/shared/forms/InputGroup";
import Button from "../components/UI/buttons/Button";
import { deepClone } from "../utlils/object-utlis";

const init = {
  title: {
    value: "",
    error: "",
    focus: false,
  },
  bio: {
    value: "",
    error: "",
    focus: false,
  },
  skills: {
    value: "",
    error: "",
    focus: false,
  },
};

const App = () => {
  const [state, setState] = useState({ ...init });

  const [hasError ,setHasError ] = useState(false)
  const mapStateToValues = (state) => {
    return Object.keys(state).reduce((acc, cur) => {
      acc[cur] = state[cur].value;
      return acc;
    }, {});
  };

  const handleChange = (e) => {
    const { name:key, value } = e.target;
    const oldState = deepClone(state);
    const values = mapStateToValues(oldState);  
    const { errors } = checkValidity(values);
    oldState[key].value = value;
    if (oldState[key].focus && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }
    setState(oldState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValues(state);
    const { isValid, errors } = checkValidity(values);
    if (isValid) {
      console.log(state);
    } else {
      const oldState = deepClone(state);
      Object.keys(errors).forEach(key =>{
        oldState[key].error = errors[key];
      })
      
      setState(oldState)
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = deepClone(state);
    oldState[name].focus = true;
    setState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValues(state);
    const { errors } = checkValidity(values);
    const oldState = deepClone(state);
    if (oldState[key].focus && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }
    setState(oldState);
  };

  const checkValidity = (values) => {
    const errors = {};
    const { title, bio, skills } = values;
    if (!title) {
      errors.title = "Invalid Title";
    }
    if (!bio) {
      errors.bio = "Invalid Bio";
    }
    if (!skills) {
      errors.skills = "Invalid skills ";
    }
    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  return (
    <div className="root">
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <InputGroup
            value={state.title.value}
            label="Title"
            name={"title"}
            placeholder={"Software Engineer"}
            onChange={handleChange}
            error={state.title.error}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.bio.value}
            label="Bio"
            name={"bio"}
            placeholder={"I am a software engineer..."}
            onChange={handleChange}
            error={state.bio.error}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.skills.value}
            label="Skills"
            name={"skills"}
            placeholder={"JavaScript , React"}
            onChange={handleChange}
            error={state.skills.error}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Button disabled={hasError} type="submit">Submit </Button>
        </div>
      </form>
    </div>
  );
};
export default App;
