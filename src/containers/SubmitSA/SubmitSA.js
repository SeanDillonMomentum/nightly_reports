import React, { useState, useContext } from "react";
import { Context } from "../../App";
import Reformed from "../../components/Reformed/Reformed";
import moment from "moment";
import { StyledButton } from "../Home/styles";
import { StyledSubmit } from "./styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import FIND_USER from "../../graphql/queries/findUser";
import CREATE_SA_REPORT from "../../graphql/mutations/createSaReport";
import SA_REPORTS_BY_ID from "../../graphql/queries/saReportsById";
import NightlySATable from "./NightlySATable";
import SearchForProject from "./SearchForSA";
import ALL_SITE_ASSESSORS from "../../graphql/queries/allSiteAssessors";
import OtherLoader from "../../components/OtherLoader/OtherLoader";

function convertToTime(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hour(s) and " + rminutes + " minute(s).";
}
const initialData = {
  customerName: "",
  customerAddress: "",
  opportunityNumber: "",
  projectNumber: "",
  jobType: "",
  date: moment().format("MM/DD/YY"),
  siteAssessor: "",
  sp: moment().format("MM/DD/YY"),
  os: moment().format("MM/DD/YY"),
  totalInterior: "",
  totalExterior: "",
  winterSolstice: 0,
  saComplete: 0,
  notes: ""
};

const dataValidation = options => {
  return [
    { field: "customerName", type: "text" },
    { field: "customerAddress", type: "text" },
    {
      field: "jobType",
      type: "select",
      options: [
        "Full (Initial)",
        "Exterior Only (Initial)",
        "Interior Only (Initial)",
        "Full (Go Back)",
        "Exterior Only (Go Back)",
        "Interior Only (Go Back)",
        "Other"
      ]
    },
    { field: "date", type: "date" },
    { field: "siteAssessor", type: "select", options },
    { field: "sp", type: "time", label: "On Site" },
    { field: "os", type: "time", label: "Off Site" },
    {
      field: "totalInterior",
      type: "slider",
      label: "Total Interior (Minutes)"
    },
    {
      field: "totalExterior",
      type: "slider",
      label: "Total Exterior (Minutes)"
    },
    { field: "notes", type: "text" },
    { field: "winterSolstice", type: "bool" },
    { field: "saComplete", type: "bool", label: "SA Complete" }
  ];
};

const SubmitNightly = ({ accountInfo }) => {
  const { client } = useContext(Context);
  const { findUser } = client.readQuery({
    query: FIND_USER,
    variables: { user: accountInfo.account.userName.toLowerCase() }
  });
  const { loading, error: errorTwo, data } = useQuery(ALL_SITE_ASSESSORS);

  const [createSaReport] = useMutation(CREATE_SA_REPORT, {
    refetchQueries: [
      { query: SA_REPORTS_BY_ID, variables: { id: findUser.id } }
    ]
  });
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  //   console.log(formData);
  const createReport = async () => {
    const report = {
      ...formData,
      totalInterior: convertToTime(formData.totalInterior),
      totalExterior: convertToTime(formData.totalExterior),
      submittedBy: findUser.id
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
  if (loading) return <OtherLoader />;
  if (errorTwo) return <div>An Error Occurred</div>;
  let optionsData = [...new Set(data.allSiteAssessors.map(x => x.Assessor))];
  return (
    <>
      <StyledSubmit>
        <h1>NIGHTLY SA REPORT</h1>
        <SearchForProject data={formData} setData={setFormData} />
        <Reformed
          flex="25%"
          data={formData}
          setData={setFormData}
          dataValidation={dataValidation(optionsData)}
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
      <NightlySATable id={findUser.id} />
    </>
  );
};

export default SubmitNightly;
