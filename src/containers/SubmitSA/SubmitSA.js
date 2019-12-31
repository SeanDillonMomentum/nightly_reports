import React, { useState, useEffect } from "react";
import Reformed from "../../components/Reformed/Reformed";
import moment from "moment";
import { StyledButton } from "../Home/styles";
import { StyledSubmit } from "./styles";
import { useMutation } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import CREATE_SA_REPORT from "../../graphql/mutations/createSaReport";
import NightlySATable from "./NightlySATable";

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
  {
    field: "jobType",
    type: "select",
    options: ["Full", "Exterior", "Interior"]
  },
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
    if (
      !location.state ||
      !location.state.userData.nightly_report_tables.find(x => x.id === "3")
    )
      history.push("/");
  }, [location, history]);
  const [createSaReport] = useMutation(CREATE_SA_REPORT);
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  //   console.log(formData);
  const createReport = async () => {
    const report = {
      ...formData,
      submittedBy: location.state.userData.id
    };

    if (Object.values(report).filter(x => x === "").length) {
      setError("Please Fill Out All Fields Prior to Submittal");
      return;
    }
    setSubmitting(true);
    setError(false);
    try {
      await createSaReport({ variables: { report } });
      setModalOpen(true);
      setSubmitting(false);
      setFormData(initialData);
    } catch (err) {
      setSubmitting(false);
      setError("An Error Occurred While Submitting");
    }
  };

  return (
    <>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <StyledButton disabled={submitting} onClick={() => createReport()}>
          SUBMIT{submitting && "ING"}
        </StyledButton>
      </StyledSubmit>
      <NightlySATable id={location.state.userData.id} />
    </>
  );
};

export default SubmitNightly;
