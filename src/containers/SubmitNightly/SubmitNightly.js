import React, { useState } from "react";
import styled from "styled-components";
import Reformed from "../../components/Reformed/Reformed";

const StyledSubmit = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  position: fixed;
  width: 100%;
  background-color: white;
  z-index: 100;
  border-bottom: 2px solid lightgray;
`;

const initialData = {
  customerName: "",
  customerAddress: "",
  jobType: "",
  date: "",
  foreman: "",
  crewDesignator: "",
  sp: "",
  os: "",
  crewCount: "",
  electricalTotalHours: "",
  installationTotalHours: "",
  roundTripTotalHours: "",
  correctPic: "",
  onsiteRevision: "",
  salesRepVisit: "",
  faOnSite: "",
  panelType: "",
  panelCount: "",
  dcSize: "",
  panelsInstalled: "",
  constructionComplete: "",
  notes: "",
  office: "",
  submittedBy: ""
};

const dataValidation = [
  { field: "customerName", type: "text" },
  { field: "customerAddress", type: "text" },
  { field: "jobType", type: "text" },
  { field: "date", type: "date" },
  { field: "foreman", type: "text" },
  { field: "crewDesignator", type: "text" },
  { field: "sp", type: "date" },
  { field: "os", type: "date" },
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

const SubmitNightly = () => {
  const [formData, setFormData] = useState(initialData);

  return (
    <StyledSubmit>
      <Reformed
        flex="31%"
        data={formData}
        setData={setFormData}
        dataValidation={dataValidation}
      />
    </StyledSubmit>
  );
};

export default SubmitNightly;
