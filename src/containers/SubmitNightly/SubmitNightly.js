import React, { useState, useEffect, useContext } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Context } from "../../App";
//styles
import { StyledSubmit } from "./styles";
import { StyledButton } from "../Home/styles";
//components
import Reformed from "reformed-material";
import SuccessModal from "../../components/Modal/SuccessModal";
import NightlyReportTable from "./NightlyReportTable";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import CrewMembersInput from "./CrewMembersInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import SearchForProject from "./SearchForProject";
//mutations/queries
import CREATE_IM_REPORT from "../../graphql/mutations/createImReport";
import IM_REPORT_QUERY from "../../graphql/queries/imReportQuery";
//utilities
import moment from "moment";

const initialData = {
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
  dcSize: "",
  office: "",
  submittedBy: "",
  correctPic: 0,
  onsiteRevision: 0,
  salesRepVisit: 0,
  faOnSite: 0,
  panelsInstalled: 0,
  constructionComplete: 0,
  notes: ""
};

const dataValidation = markets => [
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
  // {
  //   field: "faNotes",
  //   label: "FA On Site Notes",
  //   type: "text",
  //   hiddenTrigger: "faOnSite"
  // },
  { field: "dcSize", type: "text" },
  { field: "panelsInstalled", type: "bool" },
  { field: "constructionComplete", type: "bool" },
  { field: "notes", type: "text" },
  {
    field: "office",
    type: "select",
    options: markets,
    selectObject: {
      key: "market_id",
      show: "name",
      value: "market_id"
    },
    noOther: true
  }
];

const SubmitNightly = ({ history, permissions }) => {
  // console.log(permissions);
  //queries
  // const { loading: loadingTwo, data: dataTwo, error: dataErrorTwo } = useQuery(
  //   ALL_CREW_MEMBER_TYPES
  // );
  // const {
  //   loading: loadingThree,
  //   data: dataThree,
  //   error: dataErrorThree
  // } = useQuery(RECENT_TEAM, {
  //   variables: { id: findUser.recentTeam }
  // });
  const { loading, data, error: dataError } = useQuery(IM_REPORT_QUERY, {
    variables: {
      id: permissions.id,
      market_id: +permissions.all_market.market_id
    }
  });
  //check if recentTeam associated to logged in user and populate if so;
  // useEffect(() => {
  //   if (dataThree && dataThree.recentTeam) {
  //     setMembers(membersInitial(dataThree.recentTeam));
  //     setTeam(dataThree.recentTeam.id);
  //   }
  // }, [dataThree]);

  //mutations
  const [createImReport] = useMutation(CREATE_IM_REPORT, {
    refetchQueries: [
      {
        query: IM_REPORT_QUERY,
        variables: {
          id: permissions.id,
          market_id: +permissions.all_market.market_id
        }
      }
    ]
  });
  // state objects
  const [crewID, setCrewID] = useState({ name: "" });
  const [crew, setCrew] = useState([]);
  const [formData, setFormData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const createReport = async () => {
    const report = {
      ...formData,
      panelCount: +formData.panelCount,
      submittedBy: permissions.id
    };
    const crewMembers = [];

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
    } catch (err) {
      setSubmitting(false);
      setError("An Error Occurred While Submitting");
    }
  };

  if (loading) return <OtherLoader />;
  if (dataError) return <div>Error</div>;

  //"installCrewId": 1,
  // "office": "Cherry Hill, NJ",
  // "submittedBy": 2
  //   },
  //   "crewMembers": [
  //     {"crewMember": "A98275", "crewMemberType": 1},
  //        {"crewMember": "D88510", "crewMemberType":2}
  //   ]
  // console.log(crew);

  const handleSetCrew = newValue => {
    if (!newValue) {
      setCrew([]);
      setCrewID({ name: "" });
    } else {
      setCrew(
        newValue.crew_team_members.map(x => {
          return {
            ...x,
            memberType: ""
          };
        })
      );
      setCrewID({ name: newValue.name, insCrewId: newValue.insCrewId });
    }
  };
  return (
    <>
      <StyledSubmit>
        <h1>NIGHTLY IM REPORT</h1>
        {data.allInstallCrewsByMarket.length ? (
          <>
            <div style={{ width: "50%", margin: "0 auto" }}>
              <Autocomplete
                id="crews"
                value={crewID}
                options={data.allInstallCrewsByMarket}
                getOptionLabel={option => option.name}
                onChange={(_, newValue) => handleSetCrew(newValue)}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Crew"
                    placeholder="Find Crew"
                    fullWidth
                  />
                )}
              />
            </div>
            {crew.length ? (
              <CrewMembersInput
                data={crew}
                setData={setCrew}
                memberTypes={data.crewMemberTypes}
              />
            ) : null}
            <SearchForProject data={formData} setData={setFormData} />
            <Reformed
              flex="20%"
              data={formData}
              setData={setFormData}
              dataValidation={dataValidation(data.allMarkets)}
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
      {/* <NightlyReportTable id={permissions.id} /> */}
    </>
  );
};

export default SubmitNightly;
