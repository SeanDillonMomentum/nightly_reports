import moment from "moment";

const truthyCheck = val => (val === 0 ? false : true);

const convertToTime = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hour(s) and " + rminutes + " minute(s).";
};

const convertToNumber = n => {
  let split = n.split(" ");
  let hours = +split[0] * 60;
  let minutes = +split[3];
  return hours + minutes;
};

const editData = preset => {
  return {
    customerName: preset.customerName,
    customerAddress: preset.customerAddress,
    opportunityNumber: preset.opportunityNumber,
    projectNumber: preset.projectNumber,
    jobType: preset.jobType,
    date: preset.date,
    siteAssessor: preset.siteAssessor,
    sp: preset.sp,
    os: preset.os,
    totalInterior: preset.totalInterior,
    totalExterior: preset.totalExterior,
    numberOfArrays: preset.numberOfArrays,
    roofType: preset.roofType,
    notes: preset.notes,
    fortyFootLadder: preset.fortyFootLadder,
    secondAssessor: preset.secondAssessor,
    ifSecondAssessor: preset.ifSecondAssessor,
    escalation: preset.escalation,
    market: preset.market,
    saStatus: preset.saStatus,
    saStatusNotes: preset.saStatusNotes
  };
};
const initialData = {
  customerName: "",
  customerAddress: "",
  opportunityNumber: "",
  projectNumber: "",
  jobType: "",
  date: moment().format("MM/DD/YY"),
  siteAssessor: "",
  sp: moment().format("MM/DD/YY"),
  os: moment().format("MM/DD/YY"),
  totalInterior: 0,
  totalExterior: 0,
  numberOfArrays: "",
  roofType: "",
  notes: "",
  fortyFootLadder: 0,
  secondAssessor: 0,
  ifSecondAssessor: "",
  escalation: [],
  market: "",
  saStatus: "",
  saStatusNotes: ""
};

const dataValidation = options => {
  return [
    { field: "customerName", type: "text" },
    { field: "customerAddress", type: "text" },
    {
      field: "jobType",
      type: "select",
      options: [
        "Full (Initial)",
        "Exterior Only (Initial)",
        "Interior Only (Initial)",
        "Full (Go Back)",
        "Exterior Only (Go Back)",
        "Interior Only (Go Back)",
        "Roof Assessment (QA)"
      ]
    },
    {
      field: "market",
      type: "select",
      options: [
        "Cherry Hill, NJ",
        "South Plainfield, NJ",
        "Metuchen, NJ",
        "Plainview, NY",
        "Lancaster, PA",
        "East Berlin, CT",
        "Stamford, CT",
        "Ft. Lauderdale, FL",
        "Orlando, FL",
        "Tampa, FL",
        "Tamarac, FL",
        "Austin, TX",
        "Dallas, TX",
        "San Antonio, TX",
        "Orange, CA"
      ]
    },
    { field: "date", type: "date" },
    { field: "siteAssessor", type: "select", options },
    { field: "sp", type: "time", label: "On Site" },
    { field: "os", type: "time", label: "Off Site" },
    { field: "numberOfArrays", type: "text", label: "Number of Arrays" },
    {
      field: "roofType",
      type: "select",
      options: ["Shingle", "Tile", "Metal", "Flat", "Shingle/Flat Roll-Out"]
    },
    {
      field: "totalInterior",
      type: "slider",
      label: "Total Interior (Minutes)"
    },
    {
      field: "totalExterior",
      type: "slider",
      label: "Total Exterior (Minutes)"
    },
    { field: "notes", type: "text", maxlength: "1800" },
    {
      field: "fortyFootLadder",
      type: "bool",
      label: "Forty Foot Ladder Needed"
    },
    { field: "secondAssessor", type: "bool", label: "If Second Assessor" },
    {
      field: "ifSecondAssessor",
      hiddenTrigger: "secondAssessor",
      type: "select",
      options,
      label: "Second Assessor"
    },
    {
      field: "saStatus",
      type: "select",
      noOther: true,
      options: [
        "Full SA Complete",
        "Interior Complete (Winter Solstice)",
        "Exterior Only Complete",
        "Interior Complete",
        "Interior Complete (Go Back Required)",
        "SA Not Complete",
        "SA Not Complete (Customer No Show)",
        "SA Not Complete (Customer Cancel)"
      ],
      label: "SA Status"
    },
    {
      field: "escalation",
      type: "select",
      multiple: true,
      noOther: true,
      tooltips: [
        {
          option: "Project Executive",
          tooltip:
            "Project Executive Example: A Project Executive needs to handle a potential situation"
        },
        {
          option: "Retention",
          tooltip: "Retention Example: Customer has pricing concerns"
        },
        {
          option: "Design",
          tooltip:
            "Design Example: Customer doesn't want panels on front of house"
        },
        {
          option: "Exterior Mods",
          tooltip: "Exterior Mods Example: Roof Replacement needed to install"
        },
        {
          option: "Install",
          tooltip:
            "Install Example: Customer doesn't want wires/conduits visible"
        },
        {
          option: "Scheduling",
          tooltip: "Scheduling Example: Need to call ahead and have gate code"
        }
      ],
      options: [
        "Project Executive",
        "Retention",
        "Design",
        "Exterior Mods",
        "Install",
        "Scheduling"
      ]
    }
  ];
};

export {
  convertToNumber,
  truthyCheck,
  convertToTime,
  initialData,
  dataValidation,
  editData
};
