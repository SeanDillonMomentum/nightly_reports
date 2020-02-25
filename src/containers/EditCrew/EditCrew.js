import React from "react";
import { useQuery } from "@apollo/react-hooks";
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
import ALL_CREW_MEMBER_TYPES from "../../graphql/queries/crewMemberTypes";
import AddCrewType from "./AddCrewType";
// import AddCrewMember from "./AddCrewMember";

const EditCrew = () => {
  const { loading, error, data } = useQuery(ALL_CREW_MEMBER_TYPES);

  if (loading) return <OtherLoader />;
  if (error) return <div>Error</div>;

  const { crewMemberTypes } = data;
  return (
    <StyledEdit>
      <h1>Edit Crew Members/Types</h1>
      <div className="lowerFlex">
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
                    <TableRow key={member.crew_memb_type_id}>
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
