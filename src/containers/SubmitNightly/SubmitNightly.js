import React, { useState, useEffect } from "react";
import Reformed from "../../components/Reformed/Reformed";
import moment from "moment";
import { StyledButton } from "../Home/styles";
import { useMutation, useQuery } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import CREATE_IM_REPORT from "../../graphql/mutations/createImReport";
import NightlyReportTable from "./NightlyReportTable";
import { StyledSubmit } from "./styles";
import ALL_CREW_MEMBER_TYPES from "../../graphql/queries/crewMemberTypes";
import ALL_CREW_MEMBERS from "../../graphql/queries/crewMembers";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import CrewMembersInput from "./CrewMembersInput";
import SearchForProject from "./SearchForProject";

const initialData = {
  oppNumber: "",
  projectNumber: "",
  customerName: "",
  customerAddress: "",
  jobType: "",
  date: moment().format("MM/DD/YY"),
  foreman: "",
  crewDesignator: "",
  sp: moment().format("MM/DD/YY"),
  os: moment().format("MM/DD/YY"),
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
    if (
      !location.state ||
      !location.state.userData.nightly_report_tables.find(
        x => x.table_type === "imreport"
      )
    )
      history.push("/");
  }, [location, history]);

  const { loading: loadingTwo, data: dataTwo, error: dataErrorTwo } = useQuery(
    ALL_CREW_MEMBER_TYPES
  );
  const { loading, data, error: dataError } = useQuery(ALL_CREW_MEMBERS);

  const [createImReport] = useMutation(CREATE_IM_REPORT, {
    refetchQueries: [
      "crewMembers",
      { variables: { id: location.state.userData.id } }
    ]
  });
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [members, setMembers] = useState([]);

  const createReport = async () => {
    if (!members.length) {
      setError("Must select at least one crew member.");
      return;
    }
    if (members.length && members.find(x => !x.memberType)) {
      setError("All Crew Members must have member type");
      return;
    }

    const report = {
      ...formData,
      panelCount: +formData.panelCount,
      crewCount: +formData.crewCount,
      submittedBy: location.state.userData.id
    };
    const crewMembers = members.reduce((arr, curr) => {
      arr.push({ crewMember: curr.id, crewMemberType: curr.memberType });
      return arr;
    }, []);
    if (Object.values(report).filter(x => x === "").length) {
      setError("Please Fill Out All Fields Prior to Submittal");
      return;
    }
    setSubmitting(true);
    setError(false);
    try {
      await createImReport({ variables: { report, crewMembers } });
      setModalOpen(true);
      setSubmitting(false);
      setFormData(initialData);
      setMembers([]);
    } catch (err) {
      setSubmitting(false);
      setError("An Error Occurred While Submitting");
    }
  };

  if (loading || loadingTwo) return <OtherLoader />;
  if (dataError || dataErrorTwo) return <div>Errro</div>;
  let { crewMembers } = data;
  let { crewMemberTypes } = dataTwo;

  return (
    <>
      <StyledSubmit>
        <h1>NIGHTLY IM REPORT</h1>
        <CrewMembersInput
          data={members}
          setData={setMembers}
          items={crewMembers}
          memberTypes={crewMemberTypes}
        />
        <SearchForProject data={formData} setData={setFormData} />
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <StyledButton disabled={submitting} onClick={() => createReport()}>
          SUBMIT{submitting && "ING"}
        </StyledButton>
      </StyledSubmit>
      <NightlyReportTable id={location.state.userData.id} />
    </>
  );
};

export default SubmitNightly;
