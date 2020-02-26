import React, { useState } from "react";
import Reformed from "reformed-material";
import moment from "moment";
import { StyledButton } from "../Home/styles";
import { StyledSubmit } from "./styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import CREATE_SA_REPORT from "../../graphql/mutations/createSaReport";
import SA_REPORTS_BY_ID from "../../graphql/queries/saReportsById";
import NightlySATable from "./NightlySATable";
import SearchForProject from "./SearchForSA";
import ALL_SITE_ASSESSORS from "../../graphql/queries/allSiteAssessors";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import { sendEmail } from "../../utils/API";
import axios from "axios";
import {
  convertToTime,
  initialData,
  truthyCheck,
  dataValidation
} from "./utils";

const SubmitNightly = ({ permissions }) => {
  const { loading, error: errorTwo, data } = useQuery(ALL_SITE_ASSESSORS);

  const [createSaReport] = useMutation(CREATE_SA_REPORT, {
    refetchQueries: [
      { query: SA_REPORTS_BY_ID, variables: { id: permissions.id } }
    ]
  });

  const [crmId, setCrmId] = useState("");
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const createReport = async () => {
    let body;
    if (formData.escalation.length) {
      body = formData.escalation.map(x => {
        return {
          escalationType: x,
          emailReport: {
            ...formData,
            totalInterior: convertToTime(formData.totalInterior),
            totalExterior: convertToTime(formData.totalExterior),
            submittedBy: permissions.user,
            ifSecondAssessor: formData.secondAssessor
              ? formData.ifSecondAssessor
              : "N/A",
            numberOfArrays: +formData.numberOfArrays,
            fortyFootLadder: truthyCheck(formData.fortyFootLadder),
            sp: moment(formData.sp).format("MM/DD/YY h:mm a"),
            os: moment(formData.os).format("MM/DD/YY h:mm a"),
            date: moment(formData.date).format("MM/DD/YY"),
            escalation: JSON.stringify(formData.escalation)
          }
        };
      });
    }

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
      date: moment(formData.date).format("MM/DD/YY"),
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
      if (body) {
        let a = body.map(x => sendEmail(x));
        await Promise.all(a);
      }
      if (crmId) {
        await axios.post(
          "https://9gxdh56qg8.execute-api.us-east-1.amazonaws.com/api/updatenotes",
          { notes: report.notes, submittedBy: report.submittedBy, appid: crmId }
        );
        setCrmId("");
      }

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
        <SearchForProject
          setCrmId={setCrmId}
          data={formData}
          setData={setFormData}
        />
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
        <SuccessModal
          modalOpen={modalOpen}
          setModalOpen={() => setModalOpen(false)}
          specialText="SUCCESSFULLY SUBMITTED REPORT"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <StyledButton disabled={submitting} onClick={() => createReport()}>
          SUBMIT{submitting && "TING"}
        </StyledButton>
      </StyledSubmit>
      <NightlySATable
        setSuccessModalOpen={setModalOpen}
        permissions={permissions}
        optionsData={optionsData}
        id={permissions.id}
      />
    </>
  );
};

export default SubmitNightly;
