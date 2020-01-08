import React, { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Context } from "../../App";
//styles
import { StyledSubmit } from "./styles";
import { StyledButton } from "../Home/styles";
//components
import Reformed from "../../components/Reformed/Reformed";
import SuccessModal from "../../components/Modal/SuccessModal";
import NightlyReportTable from "./NightlyReportTable";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import CrewMembersInput from "./CrewMembersInput";
import SearchForProject from "./SearchForProject";
import UserTeams from "./UserTeams";
//mutations/queries
import FIND_USER from "../../graphql/queries/findUser";
import CREATE_IM_REPORT from "../../graphql/mutations/createImReport";
import ALL_CREW_MEMBER_TYPES from "../../graphql/queries/crewMemberTypes";
import ALL_CREW_MEMBERS from "../../graphql/queries/crewMembers";
import IM_REPORTS_BY_ID from "../../graphql/queries/imReportsById";
import RECENT_TEAM from "../../graphql/queries/recentTeam";
//utilities
import moment from "moment";
import UPDATE_RECENT from "../../graphql/mutations/updateRecent";

//reduce over recent team to populate table
export const membersInitial = prevCrew => {
  return prevCrew.team_members.reduce((arr, curr) => {
    arr.push({
      id: curr.crew_member.id,
      name: curr.crew_member.name,
      memberType: curr.crew_member_type.id
    });
    return arr;
  }, []);
};

const initialData = {
  oppNumber: "",
  projectNumber: "",
  customerName: "",
  customerAddress: "",
  jobType: "",
  date: moment().format("MM/DD/YY"),
  sp: moment().format("MM/DD/YY"),
  os: moment().format("MM/DD/YY"),
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
  { field: "sp", type: "time", label: "S/P" },
  { field: "os", type: "time", label: "O/S" },
  { field: "electricalTotalHours", type: "text" },
  { field: "installationTotalHours", type: "text" },
  { field: "roundTripTotalHours", type: "text" },
  { field: "correctPic", type: "bool" },
  { field: "onsiteRevision", type: "bool" },
  { field: "salesRepVisit", type: "bool" },
  { field: "faOnSite", label: "FA On Site", type: "bool" },
  { field: "panelType", type: "text" },
  { field: "panelCount", type: "text" },
  { field: "dcSize", type: "text" },
  { field: "panelsInstalled", type: "bool" },
  { field: "constructionComplete", type: "bool" },
  { field: "notes", type: "text" },
  {
    field: "office",
    type: "select",
    options: [
      "Cherry Hill, NJ",
      "South Plainfield, NJ",
      "Metuchen, NJ",
      "Plainview, NY",
      "Lancaster, PA",
      "East Berlin, CT",
      "Stamford, CT",
      "Ft. Lauderdale, FL",
      "Orlando, FL",
      "Tampa, FL",
      "Austin, TX",
      "Dallas, TX",
      "San Antonio, TX",
      "Orange, CA"
    ]
  }
];

const SubmitNightly = ({ accountInfo, history }) => {
  const { client } = useContext(Context);
  const { findUser } = client.readQuery({
    query: FIND_USER,
    variables: { user: accountInfo.account.userName.toLowerCase() }
  });

  //queries
  const { loading: loadingTwo, data: dataTwo, error: dataErrorTwo } = useQuery(
    ALL_CREW_MEMBER_TYPES
  );
  const {
    loading: loadingThree,
    data: dataThree,
    error: dataErrorThree
  } = useQuery(RECENT_TEAM, {
    variables: { id: findUser.recentTeam }
  });
  const { loading, data, error: dataError } = useQuery(ALL_CREW_MEMBERS);
  //check if recentTeam associated to logged in user and populate if so;
  useEffect(() => {
    if (dataThree && dataThree.recentTeam) {
      setMembers(membersInitial(dataThree.recentTeam));
      setTeam(dataThree.recentTeam.id);
    }
  }, [dataThree]);

  //mutations
  const [createImReport] = useMutation(CREATE_IM_REPORT, {
    refetchQueries: [
      { query: IM_REPORTS_BY_ID, variables: { id: findUser.id } }
    ]
  });
  const [updateRecent] = useMutation(UPDATE_RECENT);
  // state objects
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [team, setTeam] = useState("");

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
      submittedBy: findUser.id
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
      await updateRecent({
        variables: { user: findUser.id, team }
      });
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

  if (loading || loadingTwo || loadingThree) return <OtherLoader />;
  if (dataError || dataErrorTwo || dataErrorThree) return <div>Error</div>;
  let { crewMembers } = data;
  let { crewMemberTypes } = dataTwo;
  // console.log(location.state.userData);
  return (
    <>
      <StyledSubmit>
        <h1>NIGHTLY IM REPORT</h1>
        {findUser.teams.length ? (
          <>
            <UserTeams
              setTeam={setTeam}
              currTeam={team}
              setMembers={setMembers}
              allTeams={findUser.teams}
            />

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
          </>
        ) : (
          <h2>
            No Current Crews, Create Your First
            <StyledButton onClick={() => history.push("/editteams")}>
              GO
            </StyledButton>
          </h2>
        )}
      </StyledSubmit>
      <NightlyReportTable id={findUser.id} />
    </>
  );
};

export default SubmitNightly;
