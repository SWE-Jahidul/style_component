import InputGroup from "../components/shared/forms/InputGroup";
import useFrom from "../hooks/useFroms";

const init = {
  firstName: "",
  LastName: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First Name is Required ";
  }
  if (!values.LastName) {
    errors.LastName = "Last Name is Required ";
  }

  if (!values.email) {
    errors.email = "Email is Required ";
  }
  if (!values.password) {
    errors.password = "Password is Required ";
  }

  return errors;
};

const App = () => {
  const {
    fromState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useFrom({ init, validate });

  return (
    <div>
      <h1> My Custom Hooks From </h1>

      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <InputGroup
            value={state.firstName.value}
            lable="First Name"
            name={"firstName"}
            placeholder={"Jhon "}
            error={state.firstName.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            value={state.LastName.value}
            lable="Last Name"
            name={"LastName"}
            placeholder={"deo "}
            error={state.LastName.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.email.value}
            lable="Email"
            name={"email"}
            placeholder={"Email "}
            error={state.email.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <InputGroup
            value={state.password.value}
            lable="Password"
            name={"password"}
            placeholder={"password "}
            error={state.password.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </form>
    </div>
  );
};
export default App;
