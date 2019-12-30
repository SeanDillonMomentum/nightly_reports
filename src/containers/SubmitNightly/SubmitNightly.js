import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Reformed from "../../components/Reformed/Reformed";
import moment from "moment";
import { StyledButton } from "../Home/styles";
import { useMutation } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import CREATE_IM_REPORT from "../../graphql/mutations/createImReport";

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
  jobType: "",
  date: moment().format("MM/DD/YYYY"),
  foreman: "",
  crewDesignator: "",
  sp: moment().format("MM/DD/YYYY"),
  os: moment().format("MM/DD/YYYY"),
  crewCount: "",
  electricalTotalHours: "",
  installationTotalHours: "",
  roundTripTotalHours: "",
  panelType: "",
  panelCount: "",
  dcSize: "",
  notes: "",
  office: "",
  submittedBy: "",
  correctPic: 0,
  onsiteRevision: 0,
  salesRepVisit: 0,
  faOnSite: 0,
  panelsInstalled: 0,
  constructionComplete: 0
};

const dataValidation = [
  { field: "customerName", type: "text" },
  { field: "customerAddress", type: "text" },
  { field: "jobType", type: "text" },
  { field: "date", type: "date" },
  { field: "foreman", type: "text" },
  { field: "crewDesignator", type: "text" },
  { field: "sp", type: "time" },
  { field: "os", type: "time" },
  { field: "crewCount", type: "text" },
  { field: "electricalTotalHours", type: "text" },
  { field: "installationTotalHours", type: "text" },
  { field: "roundTripTotalHours", type: "text" },
  { field: "correctPic", type: "bool" },
  { field: "onsiteRevision", type: "bool" },
  { field: "salesRepVisit", type: "bool" },
  { field: "faOnSite", type: "bool" },
  { field: "panelType", type: "text" },
  { field: "panelCount", type: "text" },
  { field: "dcSize", type: "text" },
  { field: "panelsInstalled", type: "bool" },
  { field: "constructionComplete", type: "bool" },
  { field: "notes", type: "text" },
  { field: "office", type: "text" }
];

const SubmitNightly = ({ location, history }) => {
  useEffect(() => {
    if (!location.state) history.push("/");
  }, [location]);

  const [createImReport] = useMutation(CREATE_IM_REPORT);
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const createReport = async () => {
    const report = {
      ...formData,
      panelCount: +formData.panelCount,
      crewCount: +formData.crewCount,
      submittedBy: location.state.userData.id
    };
    setSubmitting(true);
    try {
      await createImReport({ variables: { report } });
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
      <h1>NIGHTLY IM REPORT</h1>
      <Reformed
        flex="20%"
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
