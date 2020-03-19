import React, { useState } from "react";
import ModalComponent from "../../components/Modal/Modal";
import {
  editData,
  dataValidation,
  convertToNumber,
  convertToTime
} from "./utils";
import Reformed from "reformed-material";
import { useMutation } from "@apollo/react-hooks";
import EDIT_SA_REPORT from "../../graphql/mutations/edtSaReport";
import SA_REPORTS_BY_ID from "../../graphql/queries/saReportsById";
import moment from "moment";
import { StyledButton } from "../Home/styles";

const EditSA = ({
  openState,
  handleClose,
  optionsData,
  permissions,
  setModalOpen
}) => {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState("");

  const [editSaReport] = useMutation(EDIT_SA_REPORT, {
    refetchQueries: [
      { query: SA_REPORTS_BY_ID, variables: { id: permissions.id } }
    ]
  });

  const editReport = async () => {
    const report = {
      ...formData,
      submissionTimestamp: moment().format("MM/DD/YY h:mm a"),
      totalInterior: convertToTime(formData.totalInterior),
      totalExterior: convertToTime(formData.totalExterior),
      submittedBy: permissions.id,
      ifSecondAssessor: formData.secondAssessor
        ? formData.ifSecondAssessor
        : "N/A",
      numberOfArrays: +formData.numberOfArrays,
      sp: moment(formData.sp).format("MM/DD/YY h:mm a"),
      os: moment(formData.os).format("MM/DD/YY h:mm a"),
      escalation: JSON.stringify(formData.escalation),
      saStatusNotes:
        formData.saStatus === "SA Not Complete" ? formData.saStatusNotes : ""
    };

    let nonRequired = ["ifSecondAssessor", "escalation", "saStatusNotes"];
    if (
      Object.entries(report).filter(
        ([key, val]) => val === "" && !nonRequired.includes(key)
      ).length
    ) {
      setError("Please Fill Out All Fields Prior to Submittal");
      return;
    }
    setSubmitting(true);
    setError(false);

    try {
      await editSaReport({ variables: { report, id: +openState.id } });
      setModalOpen("Successfully Edited");
      setSubmitting(false);
      handleClose();
    } catch (err) {
      setSubmitting(false);
      setError("An Error Occurred While Submitting");
    }
  };

  const [formData, setFormData] = useState(
    editData({
      ...openState,
      escalation: JSON.parse(openState.escalation),
      totalInterior: convertToNumber(openState.totalInterior),
      totalExterior: convertToNumber(openState.totalExterior)
    })
  );

  return (
    <ModalComponent openState={openState} handleClose={handleClose} width="50%">
      <Reformed
        flex="25%"
        data={formData}
        setData={setFormData}
        dataValidation={dataValidation(optionsData)}
      />
      {formData.saStatus === "SA Not Complete" && (
        <Reformed
          style={{ width: "100%" }}
          flex="100%"
          data={formData}
          setData={setFormData}
          dataValidation={[
            { field: "saStatusNotes", type: "text", label: "SA Status Notes" }
          ]}
        />
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <StyledButton disabled={submitting} onClick={() => editReport()}>
        SUBMIT{submitting && "TING"}
      </StyledButton>
    </ModalComponent>
  );
};

export default EditSA;
