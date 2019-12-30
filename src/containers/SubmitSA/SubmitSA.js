import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Reformed from "../../components/Reformed/Reformed";
import moment from "moment";
import { StyledButton } from "../Home/styles";
import { useMutation } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import CREATE_SA_REPORT from "../../graphql/mutations/createSaReport";

const StyledSubmit = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  position: fixed;
  margin: 30px;
  border-radius: 5px;
  background-color: white;
  z-index: 100;
  border-bottom: 2px solid lightgray;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  flex-direction: column;
`;

const initialData = {
  customerName: "",
  customerAddress: "",
  opportunityNumber: "",
  jobType: "",
  date: moment().format("MM/DD/YYYY"),
  siteAssessor: "",
  sp: moment().format("MM/DD/YYYY"),
  os: moment().format("MM/DD/YYYY"),
  totalInterior: "",
  totalExterior: "",
  winterSolstice: 0,
  saComplete: 0,
  notes: ""
};

const dataValidation = [
  { field: "customerName", type: "text" },
  { field: "customerAddress", type: "text" },
  { field: "opportunityNumber", type: "text" },
  { field: "jobType", type: "text" },
  { field: "date", type: "date" },
  { field: "siteAssessor", type: "text" },
  { field: "sp", type: "time" },
  { field: "os", type: "time" },
  { field: "totalInterior", type: "text" },
  { field: "totalExterior", type: "text" },
  { field: "notes", type: "text" },
  { field: "winterSolstice", type: "bool" },
  { field: "saComplete", type: "bool" }
];

const SubmitNightly = ({ location, history }) => {
  useEffect(() => {
    if (!location.state) history.push("/");
  }, [location]);
  const [createSaReport] = useMutation(CREATE_SA_REPORT);
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  console.log(formData);
  const createReport = async () => {
    const report = {
      ...formData,
      submittedBy: location.state.userData.id
    };
    setSubmitting(true);
    try {
      await createSaReport({ variables: { report } });
      setModalOpen(true);
      setSubmitting(false);
      setFormData(initialData);
    } catch (err) {
      setSubmitting(false);
      console.log(err);
    }
  };

  return (
    <StyledSubmit>
      <h1>NIGHTLY SA REPORT</h1>
      <Reformed
        flex="25%"
        data={formData}
        setData={setFormData}
        dataValidation={dataValidation}
      />
      <SuccessModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        specialText="SUCCESSFULLY SUBMITTED REPORT"
      />
      <StyledButton disabled={submitting} onClick={() => createReport()}>
        SUBMIT{submitting && "ING"}
      </StyledButton>
    </StyledSubmit>
  );
};

export default SubmitNightly;
