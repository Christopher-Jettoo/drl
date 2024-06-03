import React from "react";
import { useState } from "react";

function Form({ userResults }) {
  const [formFilled, setFormFilled] = useState({
    name: "",
    dob: "",
    happy: "",
    energy: "",
    hope: "",
    sleep_hours: "",
  });

  const styles = {
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    form: {
      padding: "10px",
    },
  };

  const handleChange = (e) => {
    setFormFilled({ ...formFilled, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formFilled),
      });

      setFormFilled({
        name: "",
        dob: "",
        happy: "",
        energy: "",
        hope: "",
        sleep_hours: "",
      });

      const data = await response.json();
      userResults(data);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <div style={styles.header}>
        <h1>Questionaire</h1>
      </div>

      <form
        style={styles.form}
        id='form'
        action='complete'
        method='post'
        onSubmit={submitHandler}
      >
        <label>Name: </label>
        <input
          id='name'
          placeholder='Enter your full name'
          value={formFilled.name}
          onChange={handleChange}
        />
        <br />
        <label>Date of Birth: </label>
        <input
          id='dob'
          placeholder='YYYY/MM/DD'
          value={formFilled.dob}
          onChange={handleChange}
        />

        <p>Please answer the the following questionaire.</p>

        <label>On a scale from 1-5, how happy doy you feel? </label>
        <input id='happy' value={formFilled.happy} onChange={handleChange} />
        <br />
        <label>On a scale from 1-5, how energetic doy you feel? </label>
        <input id='energy' value={formFilled.energy} onChange={handleChange} />
        <br />
        <label>
          On a scale from 1-5, how hopeful do you feel about the future?{" "}
        </label>
        <input id='hope' value={formFilled.hope} onChange={handleChange} />
        <br />
        <label>How many hours did you sleep last night? </label>
        <input
          id='sleep_hours'
          value={formFilled.sleep_hours}
          onChange={handleChange}
        />
        <br />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Form;
