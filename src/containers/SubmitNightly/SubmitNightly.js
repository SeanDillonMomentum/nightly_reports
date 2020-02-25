import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
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
  jobType: "",
  sp: moment().format("MM/DD/YY"),
  os: moment().format("MM/DD/YY"),
  roundTripTotalHours: "",
  dcSize: "",
  submittedBy: "",
  correctPic: 0,
  onsiteRevision: 0,
  salesRepVisit: 0,
  salesRep: "",
  faOnSite: 0,
  fieldAssurance: "",
  panelsInstalled: 0,
  constructionComplete: 0,
  notes: ""
};

const dataValidation = salesReps => [
  {
    field: "jobType",
    type: "select",
    noOther: true,
    options: [
      "Initial",
      "Return 1",
      "Return 2",
      "Return 3",
      "Return 4",
      "Uninstall",
      "Reinstall"
    ]
  },
  { field: "sp", type: "time", label: "Departed Home Office" },
  { field: "os", type: "time", label: "Departed Customer Site" },
  { field: "roundTripTotalHours", type: "text" },
  { field: "correctPic", type: "bool" },
  { field: "onsiteRevision", type: "bool" },
  { field: "salesRepVisit", type: "bool" },
  {
    field: "salesRep",
    type: "select",
    noOther: true,
    options: salesReps,
    selectObject: {
      key: "HR_NAME",
      show: "HR_NAME",
      value: "HR_NAME"
    },
    hiddenTrigger: "salesRepVisit"
  },
  { field: "faOnSite", label: "FA On Site", type: "bool" },
  {
    field: "fieldAssurance",
    type: "select",
    noOther: true,
    options: [
      { name: "HERE" },
      { name: "IS" },
      { name: "SOME" },
      { name: "FAKE" },
      { name: "OPTIONS" }
    ],
    selectObject: {
      key: "name",
      show: "name",
      value: "name"
    },
    hiddenTrigger: "faOnSite"
  },
  { field: "dcSize", type: "text" },
  { field: "panelsInstalled", type: "bool" },
  { field: "constructionComplete", type: "bool" },
  { field: "notes", type: "text" }
];

const SubmitNightly = ({ history, permissions }) => {
  const { loading, data, error: dataError } = useQuery(IM_REPORT_QUERY, {
    variables: {
      id: permissions.id,
      market_id: +permissions.all_market.market_id,
      office: permissions.all_market.name
    }
  });
  //mutations
  const [createImReport] = useMutation(CREATE_IM_REPORT, {
    refetchQueries: [
      {
        query: IM_REPORT_QUERY,
        variables: {
          id: permissions.id,
          market_id: +permissions.all_market.market_id,
          office: permissions.all_market.name
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
      submittedBy: permissions.id,
      fieldAssurance: formData.faOnSite ? formData.fieldAssurance : null,
      salesRep: formData.salesRepVisit ? formData.salesRep : null,
      installCrewId: +crewID.insCrewId,
      office: +permissions.all_market.market_id
    };

    const crewMembers = crew.reduce((arr, curr) => {
      arr.push({ crewMember: curr.coad_id, crewMemberType: curr.memberType });
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
    } catch (err) {
      setSubmitting(false);
      setError("An Error Occurred While Submitting");
    }
  };

  if (loading) return <OtherLoader />;
  if (dataError) return <div>Error</div>;

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
            <div style={{ width: "50%", margin: "15px auto" }}>
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
              dataValidation={dataValidation(data.allSalesRepsByMarket)}
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
      <NightlyReportTable data={data.imReportsById} />
    </>
  );
};

export default SubmitNightly;
