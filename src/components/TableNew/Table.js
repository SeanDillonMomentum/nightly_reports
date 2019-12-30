import React, { useState, useMemo } from "react";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@material-ui/icons";
import TableNav from "./TableNav";
import SearchDropdown from "./SearchDropdown";
import Dropdown from "./Dropdown";
import tableFilter from "./TableFilter";
import {
  TableContainer,
  FilterBar,
  CellHeader,
  NullCell,
  Showing,
  StyledNoData
} from "./styles";

/** 
@param Table
TableHeaders: object in format {id: "", label: "", key: ""}
*/

const Table = ({ data, initialSearch, initialRowsPer = 10, tableHeaders }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPer);

  const [page, setPage] = React.useState(1);
  const [currSort, setCurrSort] = useState({ key: "", direction: "" });
  const [currSearch, setCurrSearch] = useState(initialSearch);
  const [search, setSearch] = useState("");
  // util funcs
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

  const currentPages = data => {
    let nums = [];
    for (let i = 1; i <= Math.ceil(data.length / rowsPerPage); i++) {
      nums.push(i);
    }
    return nums;
  };

  const handlePageClick = event => setPage(Number(event.target.id));

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

  const tableData = useMemo(
    () => tableFilter(data, search, currSort, currSearch),
    [data, search, currSort, currSearch]
  );
  const handleDropdown = event => setDropdownOpen(event.currentTarget);
  const openDropdown = Boolean(dropdownOpen);

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
            {tableHeaders.map(column => (
              <CellHeader onClick={() => sortHandler(column)} key={column.id}>
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
                {tableHeaders.map(x => (
                  <NullCell key={x.key}>
                    {Array.isArray(row[x.key]) ? (
                      <ul>
                        {row[x.key].map((y, index) => (
                          <li key={index}>{y}</li>
                        ))}
                      </ul>
                    ) : (
                      row[x.key]
                    )}
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
