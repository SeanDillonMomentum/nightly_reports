import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import ALL_CREW_MEMBERS from "../../graphql/queries/crewMembers";
import ALL_CREW_MEMBER_TYPES from "../../graphql/queries/crewMemberTypes";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Edit, DeleteForever } from "@material-ui/icons";
import { StyledEdit } from "./styles";
import AddCrewType from "./AddCrewType";
import AddCrewMember from "./AddCrewMember";

const EditCrew = ({ history, location }) => {
  useEffect(() => {
    if (
      !location.state ||
      !location.state.userData.nightly_report_tables.find(
        x => x.table_type === "auth"
      )
    )
      history.push("/");
  }, [location, history]);

  const { loading, error, data } = useQuery(ALL_CREW_MEMBERS);
  const { loading: loadingTwo, error: errorTwo, data: dataTwo } = useQuery(
    ALL_CREW_MEMBER_TYPES
  );

  if (loading || loadingTwo) return <OtherLoader />;
  if (error || errorTwo) return <div>Error</div>;

  let { crewMembers } = data;
  let { crewMemberTypes } = dataTwo;

  return (
    <StyledEdit>
      <h1>Edit Crew Members/Types</h1>
      <div className="lowerFlex">
        <div className="split">
          <AddCrewMember />
          <div className="tableContainer">
            <h2>Crew Members</h2>
            <Table>
              <TableHead>
                <TableRow className="tableHeaders">
                  <TableCell>Name</TableCell>
                  <TableCell>
                    <Edit />
                  </TableCell>
                  <TableCell>
                    <DeleteForever />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!crewMembers.length ? (
                  <TableRow>
                    <TableCell colSpan="3">No Current Members</TableCell>
                  </TableRow>
                ) : (
                  crewMembers.map(member => (
                    <TableRow key={member.id}>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>
                        <Edit />
                      </TableCell>
                      <TableCell>
                        <DeleteForever />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="split">
          <AddCrewType />
          <div className="tableContainer">
            <h2>Crew Member Types</h2>
            <Table>
              <TableHead>
                <TableRow className="tableHeaders">
                  <TableCell>Type</TableCell>
                  <TableCell>
                    <Edit />
                  </TableCell>
                  <TableCell>
                    <DeleteForever />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!crewMemberTypes.length ? (
                  <TableRow>
                    <TableCell colSpan="3">
                      No Current Crew Member Types
                    </TableCell>
                  </TableRow>
                ) : (
                  crewMemberTypes.map(member => (
                    <TableRow key={member.id}>
                      <TableCell>{member.type}</TableCell>
                      <TableCell>
                        <Edit />
                      </TableCell>
                      <TableCell>
                        <DeleteForever />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </StyledEdit>
  );
};

export default EditCrew;
