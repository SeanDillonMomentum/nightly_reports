import { thisMonthFilter, lastMonthFilter } from "../filterUtils/dateFilters";
import moment from "moment";

/** @param tableCalculation table calculation takes in whether it is a paginated/non-paginated dataset and returns data back filtered*/
const tableCalculation = (
  rows,
  rowSearched,
  search,
  sorter,
  headings,
  headingSort,
  sortDirection,
  query,
  filter,
  filterValue,
  searchTwo
) => {
  let filteredRows = null;
  let formatDate = date => moment(date).format("MMMM Do YYYY");

  if (rows) {
    if (!query && search && searchTwo) {
      filteredRows = rows.filter(row => {
        if (typeof row[rowSearched] === "string")
          return (
            row[rowSearched].toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
        else if (typeof row[rowSearched] === "number") {
          return (
            row[rowSearched]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1
          );
        } else {
          return (
            row[rowSearched].props.children
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1
          );
        }
      });
      filteredRows = rows.filter(
        row =>
          formatDate(row[1])
            .toLowerCase()
            .indexOf(searchTwo.toLowerCase()) !== -1
      );
    } else if (!query && search) {
      filteredRows = rows.filter(row => {
        if (typeof row[rowSearched] === "string")
          return (
            row[rowSearched].toLowerCase().indexOf(search.toLowerCase()) !== -1
          );
        else if (typeof row[rowSearched] === "number") {
          return (
            row[rowSearched]
              .toString()
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1
          );
        } else {
          return (
            row[rowSearched].props.children
              .toLowerCase()
              .indexOf(search.toLowerCase()) !== -1
          );
        }
      });
    } else if (!query && searchTwo) {
      filteredRows = rows.filter(row => {
        return (
          formatDate(row[1])
            .toLowerCase()
            .indexOf(searchTwo.toLowerCase()) !== -1
        );
      });
    } else {
      filteredRows = rows;
    }

    //check the header title against the clicked header to sort (need to send headings as well as headingssort if using icon)

    let index = !headingSort
      ? headings.indexOf(sorter)
      : headingSort.indexOf(sorter);

    let filterColumnIndex = headingSort.indexOf(filterValue.header);

    if (filterValue.value) {
      filteredRows = filteredRows.filter(
        a => a[filterColumnIndex] === filterValue.value
      );
    }

    //sort up or down on click via state change (take into consideration the non-string div that is being used in one cell)
    if (sorter && !sortDirection) {
      filteredRows.sort((a, b) => {
        if (typeof a[index] !== "string" && typeof a[index] !== "number") {
          return a[index].props.children[0].toString() <
            b[index].props.children[0].toString()
            ? -1
            : 1;
        } else if (typeof a[index] === "number") {
          return a[index].toString() < b[index].toString() ? -1 : 1;
        } else {
          return a[index].toLowerCase() < b[index].toLowerCase() ? -1 : 1;
        }
      });
    } else if (sorter && sortDirection) {
      filteredRows.sort((a, b) => {
        if (typeof a[index] !== "string" && typeof a[index] !== "number") {
          return a[index].props.children[0].toString() <
            b[index].props.children[0].toString()
            ? 1
            : -1;
        } else if (typeof a[index] === "number") {
          return a[index].toString() < b[index].toString() ? 1 : -1;
        } else {
          return a[index].toLowerCase() < b[index].toLowerCase() ? 1 : -1;
        }
      });
    }

    if (filter === "Last Month") {
      filteredRows = lastMonthFilter(filteredRows);
    } else if (filter === "This Month") {
      filteredRows = thisMonthFilter(filteredRows);
    }

    return filteredRows;
    //filter all rows regardless of page (i.e. if on last page and you sort, don't sort just that page, sort the whole set of rows)
  } else {
    return rows;
  }
};
/**@param currentRowsCalc currentRowsCalc returns filtered rows if non-paginated */
const currentRowsCalc = (rows, currentPage, rowsPerPage, tableCalc, query) => {
  if (query) {
    return tableCalc;
  }
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let filteredRows = tableCalc;

  // if (filteredRows.length === 0) {
  //   return rows.slice(indexOfFirstRow, indexOfLastRow);
  // } else {
  return filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  // }
};

const headerFiltered = header => header.filter(x => typeof x === "string");

const exportFormat = (rows, header) => {
  const headerFiltered = header.filter(x => {
    return typeof x === "string";
  });
  const readiedRows = rows
    .map(x => {
      return x.map(y => {
        if (
          typeof y === "string" ||
          (typeof y === "object" && y.props.children) ||
          typeof y === "number"
        ) {
          return typeof y === "object" && !Array.isArray(y.props.children)
            ? y.props.children
            : typeof y === "object" && Array.isArray(y.props.children)
            ? `${y.props.children[0]}${y.props.children[1]}`
            : typeof y === "number"
            ? y.toString()
            : y;
        } else return null;
      });
    })
    .map(x => {
      return x.filter(y => {
        return typeof y === "string";
      });
    });

  return [headerFiltered].concat(readiedRows);
};

const exportRowsFormat = rows =>
  rows
    .map(x => {
      return x.map(y => {
        if (
          typeof y === "string" ||
          (typeof y === "object" && y.props.children) ||
          typeof y === "number"
        ) {
          return typeof y === "object" && !Array.isArray(y.props.children)
            ? y.props.children
            : typeof y === "object" && Array.isArray(y.props.children)
            ? `${y.props.children[0]}${y.props.children[1]}`
            : typeof y === "number"
            ? y.toString()
            : y;
        } else return null;
      });
    })
    .map(x => {
      return x.filter(y => {
        return typeof y === "string";
      });
    });

export {
  tableCalculation,
  currentRowsCalc,
  headerFiltered,
  exportFormat,
  exportRowsFormat
};
