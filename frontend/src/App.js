import "./App.css";
import Form from "./components/form";
import Results from "./components/results";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState(null);

  const handleUserFormSubmitResults = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <Form userResults={handleUserFormSubmitResults} />
      {formData && <Results formData={formData} />}
    </div>
  );
}

export default App;
