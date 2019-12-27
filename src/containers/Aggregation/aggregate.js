import moment from "moment";
const aggregate = (data, from, to) => {
  let filteredData = data.filter(x => moment(x.date).isBetween(from, to));
  let allOffices = filteredData.map(x => x.office);
  let offices = Array.from(new Set(allOffices)).sort((a, b) =>
    a > b ? 1 : -1
  );

  let dataByOffice = offices.reduce((array, curr) => {
    let arr = [];
    for (let i = 0; i < filteredData.length; i++) {
      if (curr === filteredData[i].office) arr.push(filteredData[i]);
    }
    // console.log(arr);
    array.push(arr);
    return array;
  }, []);

  const installs = dataByOffice.reduce((array, curr) => {
    array.push([
      curr[0].office,
      curr.filter(y => y.jobType === "New").length,
      curr.filter(y => y.jobType === "Uninstall").length,
      curr.filter(y => y.jobType === "Re-Install").length,
      curr.filter(y => y.jobType === "Partial Install").length,
      curr.filter(y => y.jobType === "Go Backs").length,
      curr.length,
      40,
      `${((curr.length / 40) * 100).toFixed(2)}%`
    ]);
    return array;
  }, []);

  const revisions = dataByOffice.reduce((array, curr) => {
    let revisionsTrue = curr.filter(row => row.onsiteRevision === "true")
      .length;
    array.push([
      curr[0].office,
      revisionsTrue,
      `${(revisionsTrue / curr.length).toFixed(2) * 100}%`
    ]);
    return array;
  }, []);

  const picks = dataByOffice.reduce((array, curr) => {
    let falsePicks = curr.filter(row => row.correctPic === "true").length;
    array.push([
      curr[0].office,
      curr.length,
      falsePicks,
      `${(falsePicks / curr.length).toFixed(2) * 100}%`
    ]);
    return array;
  }, []);

  const salesRepsOnSite = dataByOffice.reduce((array, curr) => {
    let salesRepTrue = curr.filter(row => row.salesRepVisit === "true").length;
    array.push([
      curr[0].office,
      salesRepTrue,
      `${(salesRepTrue / curr.length).toFixed(2) * 100}%`
    ]);
    return array;
  }, []);

  const panelsInstalled = dataByOffice.reduce((array, curr) => {
    // let salesRepTrue = curr.filter(row => row.salesRepVisit === "true").length;
    // console.log(curr);
    array.push([
      curr[0].office,
      curr.reduce((total, current) => total + +current.panelCount, 0),
      curr.reduce((total, current) => total + +current.dcSize, 0).toFixed(2),
      curr.reduce((total, current) => {
        let num =
          current.constructionComplete === "true" ? +current.panelCount : 0;

        return total + num;
      }, 0),
      curr
        .reduce((total, current) => {
          let num =
            current.constructionComplete === "true" ? +current.dcSize : 0;

          return total + num;
        }, 0)
        .toFixed(2)
    ]);
    return array;
  }, []);

  return {
    offices,
    installs,
    revisions,
    picks,
    salesRepsOnSite,
    panelsInstalled
  };

  //   let dataByOffice = filteredData.reduce((array, curr) => {
  //     let arr = [];
  //     for (let i = 0; i < offices.length; i++) {
  //       if (curr.office === offices[i]) arr.push(curr);
  //     }
  //     console.log(arr);
  //     array.push(arr);
  //     return array;
  //   }, []);
  //   console.log(dataByOffice);
  //   aggregatedTable = filteredData.reduce(() => {

  //   }
};
export default aggregate;
