import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { TextField } from "@material-ui/core";
import { StyledButton } from "../Home/styles";
import ADD_CREW_MEMBER_TYPE from "../../graphql/mutations/addCrewMemberType";

const AddCrewType = () => {
  const [addCrewMemberType] = useMutation(ADD_CREW_MEMBER_TYPE, {
    refetchQueries: ["crewMemberTypes"]
  });
  const [submitting, setSubmitting] = useState(false);
  const [memberType, setMemberType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitForm = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addCrewMemberType({ variables: { type: memberType } });
      error && setError("");
      setSubmitting(false);
      setMemberType("");
      setSuccess("Successfully Added!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setSubmitting(false);
      setError("An error occurred");
    }
    // await new Promise(() => setTimeout(() => setSubmitting(false), 3000));
  };
  return (
    <div className="tableContainer">
      <h2>Add Crew Member Type</h2>
      <form className="form" onSubmit={e => submitForm(e)}>
        <TextField
          className="inputLength"
          label="Member Type"
          name="type"
          placeholder="Member Type"
          onChange={e => setMemberType(e.target.value)}
          value={memberType}
        />
        {error && <span className="error">{error}</span>}
        {success && <span className="success">{success}</span>}
        <StyledButton type="submit" disabled={submitting}>
          SUBMIT{submitting && "TING"}
        </StyledButton>
      </form>
    </div>
  );
};

export default AddCrewType;
