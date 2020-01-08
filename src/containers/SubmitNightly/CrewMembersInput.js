import React from "react";
import styled from "styled-components";
import { DropDown, DropDownItem, SearchStyles } from "./styles";
import Downshift from "downshift";
import CrewMember from "./CrewMember";
import { DeleteForever } from "@material-ui/icons";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const StyledDownshift = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  input {
    margin-top: 10px;
    border-radius: 5px;
    padding: 5px;
    border: 1px lightgray solid;
  }
`;

const CrewMembersInput = ({ items, setData, data, memberTypes }) => {
  let currentItems = items.filter(x => !data.find(y => y.name === x.name));

  return (
    <>
      <SearchStyles>
        <Downshift
          onChange={(selection, other) => {
            if (selection) setData([...data, { ...selection, memberType: "" }]);
            other.clearSelection();
          }}
          itemToString={item => (item ? item.name : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            getRootProps
          }) => (
            <StyledDownshift>
              <label {...getLabelProps()}>Search By Crew Member Name</label>
              <div
                style={{ display: "inline-block" }}
                {...getRootProps({}, { suppressRefError: true })}
              >
                <input {...getInputProps()} />
              </div>
              <div
                style={{ maxHeight: "200px", overflow: "scroll" }}
                {...getMenuProps()}
              >
                {isOpen && inputValue
                  ? currentItems
                      .filter(
                        item =>
                          !inputValue ||
                          item.name
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                      )
                      .map((item, index) => (
                        <DropDown key={index}>
                          <DropDownItem
                            highlighted={highlightedIndex === index}
                            {...getItemProps({ item, index, key: item.id })}
                          >
                            {item.name}
                          </DropDownItem>
                        </DropDown>
                      ))
                  : null}
              </div>
            </StyledDownshift>
          )}
        </Downshift>
      </SearchStyles>
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
            <TableCell style={{ border: "1px solid #ffffff" }}>
              <DeleteForever style={{ color: "red" }} />
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
                key={member.id}
                allData={data}
                allSetter={setData}
                data={member}
                index={index}
              />
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CrewMembersInput;
