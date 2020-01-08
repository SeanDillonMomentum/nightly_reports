import React, { useState, useContext } from "react";
import { Context } from "../../App";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField
} from "@material-ui/core";
import { useQuery, useMutation } from "@apollo/react-hooks";
import SuccessModal from "../../components/Modal/SuccessModal";
import CrewMembersInput from "../SubmitNightly/CrewMembersInput";
import ALL_CREW_MEMBER_TYPES from "../../graphql/queries/crewMemberTypes";
import ALL_CREW_MEMBERS from "../../graphql/queries/crewMembers";
import FIND_USER from "../../graphql/queries/findUser";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import { StyledButton } from "../Home/styles";
import { StyledSubmit } from "../SubmitNightly/styles";
import CREATE_TEAM from "../../graphql/mutations/createTeam";

const initialData = user => {
  return {
    name: "",
    user
  };
};

const EditTeam = ({ accountInfo }) => {
  const { client } = useContext(Context);
  const { findUser } = client.readQuery({
    query: FIND_USER,
    variables: { user: accountInfo.account.userName.toLowerCase() }
  });
  const { loading: loadingTwo, data: dataTwo, error: dataErrorTwo } = useQuery(
    ALL_CREW_MEMBER_TYPES
  );
  const { loading, data, error: dataError } = useQuery(ALL_CREW_MEMBERS);
  const [formData, setFormData] = useState(initialData(findUser.id));
  const [createTeam] = useMutation(CREATE_TEAM, {
    refetchQueries: [{ query: FIND_USER, variables: { user: findUser.user } }]
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  const submitTeam = async () => {
    if (!members.length) {
      setError("Must select at least one crew member.");
      return;
    }
    if (members.length && members.find(x => !x.memberType)) {
      setError("All Crew Members must have member type");
      return;
    }
    if (!formData.name) {
      setError("Please Name Team");
      return;
    }
    const crewMembers = members.reduce((arr, curr) => {
      arr.push({ crewMember: curr.id, crewMemberType: curr.memberType });
      return arr;
    }, []);
    let variables = { ...formData, crewMembers };
    setSubmitting(true);
    setError(false);
    try {
      await createTeam({ variables });
      setModalOpen(true);
      setSubmitting(false);
      setFormData(initialData(findUser.id));
      setMembers([]);
    } catch (err) {
      setError("An Error Occurred");
      setSubmitting(false);
      setError("An Error Occurred While Submitting");
    }
  };

  if (loading || loadingTwo) return <OtherLoader />;
  if (dataError || dataErrorTwo) return <div>Error</div>;
  let { crewMembers } = data;
  let { crewMemberTypes } = dataTwo;

  return (
    <>
      <StyledSubmit>
        <h1>ADD NEW TEAM</h1>
        <TextField
          style={{ margin: "15px", width: "300px" }}
          value={formData.name}
          name="name"
          label="Team Name"
          placeholder="Team Name"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <CrewMembersInput
          data={members}
          setData={setMembers}
          items={crewMembers}
          memberTypes={crewMemberTypes}
        />
        <SuccessModal
          modalOpen={modalOpen}
          setModalOpen={() => setModalOpen(false)}
          specialText="SUCCESSFULLY SUBMITTED REPORT"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <StyledButton disabled={submitting} onClick={() => submitTeam()}>
          SUBMIT{submitting && "ING"}
        </StyledButton>
      </StyledSubmit>
      <StyledSubmit>
        <h1>CURRENT TEAMS</h1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              <TableCell>CREW MEMBERS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {findUser.teams.map(x => (
              <TableRow key={x.id}>
                <TableCell>{x.name}</TableCell>
                <TableCell>
                  {" "}
                  <ul
                    style={{
                      display: "flex",
                      listStyleType: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "200px"
                    }}
                  >
                    {x.team_members.map((y, index) => (
                      <li
                        key={index}
                      >{`${y.crew_member.name} - ${y.crew_member_type.type}`}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledSubmit>
    </>
  );
};

export default EditTeam;
