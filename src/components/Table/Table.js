import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from "@material-ui/core";
import styled from "styled-components";
import FilterDiv from "./FilterDiv";
import SearchDiv from "./SearchDiv";
import DateFilter from "./DateFilter";
import moment from "moment";

const StyledTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  .topDiv {
    flex: 0.2;
    padding: 10px 0;
    border-bottom: 2px solid #f5f5f5;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .MuiTableCell-paddingNone {
    padding: 5px 14px 5px 10px;
    line-height: 1;
  }
  .bottomDiv {
    flex: 0.7;
  }
  .paginateDiv {
    flex: 0.1;
  }
`;

const TableComponent = ({ headers, data }) => {
  const [inputVal, setInputVal] = useState("");
  const [searchType, setSearchType] = useState("customerName");
  const [hidden, setHidden] = useState([]);
  const [dateFilter, setDateFilter] = useState("allTime");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dateFilterFunc = data => {
    let today = moment().format("MM/DD/YY");
    let tomorrow = moment()
      .add(1, "days")
      .format("MM/DD/YY");
    let weekAgo = moment()
      .subtract(8, "days")
      .format("MM/DD/YY");

    let monthAgo = moment()
      .subtract(1, "months")
      .format("MM/DD/YY");

    switch (dateFilter) {
      case "allTime": {
        return data;
      }
      case "today": {
        return data.filter(x => today === x.date);
      }
      case "lastWeek": {
        return data.filter(x => {
          let todayIs = moment(x.date).format("MM/DD/YYYY");
          return moment(todayIs).isBetween(weekAgo, tomorrow);
        });
      }
      case "lastMonth": {
        return data.filter(x => {
          let todayIs = moment(x.date).format("MM/DD/YYYY");
          return moment(todayIs).isBetween(monthAgo, tomorrow);
        });
      }
      default: {
        return data;
      }
    }
  };

  const dataFunc = data => {
    let dateFilteredData = dateFilterFunc(data);

    if (searchType && inputVal) {
      return dateFilteredData.filter(x =>
        typeof x[searchType] === "number"
          ? x[searchType]
              .toString()
              .toLowerCase()
              .indexOf(inputVal.toLowerCase()) !== -1
          : x[searchType].toLowerCase().indexOf(inputVal.toLowerCase()) !== -1
      );
    }
    return dateFilteredData;
  };

  const checkHidden = index => {
    if (!hidden.length) return null;
    if (hidden.includes(index)) return { display: "none" };
    return null;
  };
  return (
    <StyledTableContainer>
      <div className="topDiv">
        <SearchDiv
          inputVal={inputVal}
          setInputVal={setInputVal}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <DateFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
        <FilterDiv hidden={hidden} setHidden={setHidden} />
      </div>
      <div className="bottomDiv">
        <Table padding="none">
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell style={checkHidden(index)} key={header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFunc(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="cells" style={checkHidden(0)}>
                    {row.customerName}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(1)}>
                    {row.customerAddress}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(2)}>
                    {row.jobType}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(3)}>
                    {row.date}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(4)}>
                    {row.foreman}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(5)}>
                    {row.crewDesignator}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(6)}>
                    {row.sp}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(7)}>
                    {row.os}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(8)}>
                    {row.crewCount}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(9)}>
                    {row.electricalTotalHours}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(10)}>
                    {row.installationTotalHours}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(11)}>
                    {row.roundTripTotalHours}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(12)}>
                    {row.correctPic}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(13)}>
                    {row.onsiteRevision}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(14)}>
                    {row.salesRepVisit}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(15)}>
                    {row.faOnSite}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(16)}>
                    {row.panelType}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(17)}>
                    {row.panelCount}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(18)}>
                    {row.dcSize}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(19)}>
                    {row.panelsInstalled}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(20)}>
                    {row.constructionComplete}
                  </TableCell>
                  <TableCell className="cells" style={checkHidden(21)}>
                    {row.notes}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataFunc(data).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <div className="paginateDiv">paginate</div>
    </StyledTableContainer>
  );
};

export default TableComponent;
