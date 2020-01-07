import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { TextField } from "@material-ui/core";
import { StyledButton } from "../Home/styles";
import ADD_CREW_MEMBER from "../../graphql/mutations/addCrewMember";

const AddCrewMember = () => {
  const [addCrewMember] = useMutation(ADD_CREW_MEMBER, {
    refetchQueries: ["crewMembers"]
  });
  const [submitting, setSubmitting] = useState(false);
  const [memberName, setMemberName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitForm = async e => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addCrewMember({ variables: { name: memberName } });
      error && setError("");
      setSubmitting(false);
      setMemberName("");
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
      <h2>Add Crew Member</h2>
      <form className="form" onSubmit={e => submitForm(e)}>
        <TextField
          className="inputLength"
          label="Member Name"
          name="name"
          placeholder="Member Name"
          onChange={e => setMemberName(e.target.value)}
          value={memberName}
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

export default AddCrewMember;
