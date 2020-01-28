const tableFilter = (data, search, currSort, currSearch, initialSort) => {
  initialSort &&
    data.sort((a, b) => (a[initialSort] < b[initialSort] ? 1 : -1));
  let searched = searchFilter(data, search, currSearch);
  let sorted = sortFilter(searched, currSort);
  return sorted;
};

const searchFilter = (data, textInput, searchParam) => {
  if (!textInput) return data;
  let searchRes = data.filter(
    val =>
      val[searchParam]
        .toString()
        .toLowerCase()
        .indexOf(textInput.toLowerCase().trim()) !== -1
  );
  if (searchRes.length > 0) return searchRes;
  return data;
};

const sortFilter = (data, currSort) => {
  if (currSort.key && currSort.direction) {
    let mutable = [...data];
    let directionOne = currSort.direction === 1 ? 1 : -1;
    let directionTwo = currSort.direction === 1 ? -1 : 1;
    return mutable.sort((a, b) =>
      a[currSort.key] < b[currSort.key] ? directionOne : directionTwo
    );
  }

  return data;
};

export default tableFilter;
