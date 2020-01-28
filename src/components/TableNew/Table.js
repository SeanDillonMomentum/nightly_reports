import React, { useState, useMemo } from "react";
import {
  ArrowUpward,
  ArrowDownward,
  UnfoldMore,
  Cancel,
  CheckBox
} from "@material-ui/icons";
import TableNav from "./TableNav";
import SearchDropdown from "./SearchDropdown";
import Dropdown from "./Dropdown";
import tableFilter from "./TableFilter";
import FilterDiv from "./FilterDiv";
import {
  TableContainer,
  FilterBar,
  CellHeader,
  NullCell,
  Showing,
  StyledNoData
} from "./styles";
import useStateWithLocalStorage from "../../utils/localstoragehook";
import moment from "moment";

/** 
@param Table
TableHeaders: object in format {id: "", label: "", key: ""}
*/

const Table = ({
  data,
  initialSearch,
  initialRowsPer = 10,
  tableHeaders,
  localStorageVal,
  initialSort
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPer);
  const [hidden, setHidden] = useStateWithLocalStorage(localStorageVal, []);
  const [page, setPage] = React.useState(1);
  const [currSort, setCurrSort] = useState({ key: "", direction: "" });
  const [currSearch, setCurrSearch] = useState(initialSearch);
  const [search, setSearch] = useState("");
  // util funcs
  // console.log(localVal);
  // handle sort on column header clicks
  const sortHandler = column => {
    let { key, sortless } = column;
    if (!key || sortless) return;
    if (currSort.key === key) {
      let direction = !currSort.direction
        ? 1
        : currSort.direction === 1
        ? 2
        : "";
      setCurrSort({ ...currSort, direction });
    } else {
      setCurrSort({
        key,
        direction: 1
      });
    }
  };

  // handle large column sets with display none;
  const checkHidden = index => {
    if (!hidden.length) return null;
    if (hidden.includes(index)) return { display: "none" };
    return null;
  };

  // return current number of pages based on current filtered data and rows per page;
  const currentPages = data => {
    let nums = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
      nums.push(i);
    }
    return nums;
  };

  const handlePageClick = event => setPage(Number(event.target.id));

  //handle pagination
  const paginate = direction => {
    let pageNumbers = currentPages(tableData);
    direction === "left" && page === 1
      ? setPage(pageNumbers.length)
      : direction === "left" && page !== 1
      ? setPage(page - 1)
      : direction === "right" && page === pageNumbers.length
      ? setPage(pageNumbers[0])
      : setPage(page + 1);
  };

  //reset to page 1 and set rows per page on click;
  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e);
    setPage(1);
  };

  // handle sort arrow ui
  const currArrow = key => {
    if (key !== currSort.key || !currSort.direction) return <UnfoldMore />;
    if (key === currSort.key && currSort.direction === 1)
      return <ArrowDownward />;
    if (key === currSort.key && currSort.direction === 2)
      return <ArrowUpward />;
  };

  // memoize currently filtered data - re-render when applicable variables change;
  const tableData = useMemo(
    () => tableFilter(data, search, currSort, currSearch, initialSort),
    [data, search, currSort, currSearch, initialSort]
  );
  const handleDropdown = event => setDropdownOpen(event.currentTarget);
  const openDropdown = Boolean(dropdownOpen);

  // handle date and boolean values dynamically though config - otherwise return data;
  const checkType = (value, header) => {
    let { type, arrayVal } = header;

    if (Array.isArray(value))
      return (
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
          {value
            ? value.map((y, index) => (
                <li key={index}>{arrayVal ? y[arrayVal] : y}</li>
              ))
            : "N / A"}
        </ul>
      );
    if (!type) return value;
    if (type === "date")
      return moment(value)
        .utc()
        .format("MM/DD/YY h:mm a");
    if (type === "bool")
      return value === null ? (
        "N/A"
      ) : value === 0 ? (
        <Cancel style={{ color: "red" }} />
      ) : (
        <CheckBox style={{ color: "green" }} />
      );
  };

  return !tableData.length ? (
    <StyledNoData>No Current Data</StyledNoData>
  ) : (
    <>
      <FilterBar>
        <SearchDropdown
          currSearch={currSearch}
          setCurrSearch={setCurrSearch}
          search={search}
          setSearch={setSearch}
          relatedData={tableHeaders}
        />

        <div className="rightFilter">
          <FilterDiv
            headers={tableHeaders}
            hidden={hidden}
            setHidden={setHidden}
          />
          <div className="rowsDisplayedDiv">
            <span>Showing</span>
            <Dropdown
              rowValue={rowsPerPage}
              open={openDropdown}
              anchorEl={dropdownOpen}
              setRowsPerPage={handleChangeRowsPerPage}
              handleDropdown={handleDropdown}
              handleClose={setDropdownOpen}
              items={[5, 10, 20]}
            />
            <span> rows per page</span>
          </div>
        </div>
      </FilterBar>

      <TableContainer>
        <thead>
          <tr>
            {tableHeaders.map((column, index) => (
              <CellHeader
                style={checkHidden(index)}
                onClick={() => sortHandler(column)}
                key={column.id}
              >
                <div className="cellDiv">
                  {column.label}
                  {!column.sortless && currArrow(column.key)}
                </div>
              </CellHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData
            .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
            .map((row, index) => (
              <tr key={index}>
                {tableHeaders.map((header, cellIndex) => (
                  <NullCell style={checkHidden(cellIndex)} key={header.key}>
                    {checkType(row[header.key], header)}
                  </NullCell>
                ))}
              </tr>
            ))}
        </tbody>
      </TableContainer>
      <Showing>
        <TableNav
          pageNumbers={currentPages(tableData)}
          currentPage={page}
          handlePageClick={handlePageClick}
          handleArrowClick={paginate}
        />
      </Showing>
    </>
  );
};

export default Table;
