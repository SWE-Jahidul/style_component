import { InputGroup } from "../components/shared/forms/InputGroup";

const App = () => {
  return (
    <>
      <div className="root">
        <InputGroup
          lable="Title"
          name="title"
          placeholder={"Enter Your Title "}
          error={"Something went Wrong !"}
        />

        
      </div>
    </>
  );
};
export default App;
