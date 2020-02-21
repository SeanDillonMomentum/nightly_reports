import React from "react";
import CrewMember from "./CrewMember";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const CrewMembersInput = ({ setData, data, memberTypes }) => {
  return (
    <Table
      style={{
        border: "1px solid #e9e9e9",
        margin: "15px",
        borderRadius: "5px"
      }}
    >
      <TableHead>
        <TableRow style={{ backgroundColor: "#e9e9e9" }}>
          <TableCell style={{ border: "1px solid #ffffff" }}>#</TableCell>
          <TableCell style={{ border: "1px solid #ffffff" }}>Name</TableCell>
          <TableCell style={{ border: "1px solid #ffffff" }}>
            Crew Type
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {!data.length ? (
          <TableRow>
            <TableCell style={{ textAlign: "center" }} colSpan="4">
              No Current Crew Members Selected
            </TableCell>
          </TableRow>
        ) : (
          data.map((member, index) => (
            <CrewMember
              memberTypes={memberTypes}
              key={member.crew_team_id}
              allData={data}
              allSetter={setData}
              data={member}
              index={index}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CrewMembersInput;
