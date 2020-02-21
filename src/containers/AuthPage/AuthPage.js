import React, { useState } from "react";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import Table from "../../components/TableNew/Table";
import Reformed from "reformed-material";
import { useQuery, useMutation } from "@apollo/react-hooks";
import EditModal from "./EditModal";
import ALL_USERS from "../../graphql/queries/allUsers";
import ADD_USER from "../../graphql/mutations/addUser";
import { StyledButton } from "../Home/styles";

import styled from "styled-components";
import SuccessModal from "../../components/Modal/SuccessModal";
import { Edit } from "@material-ui/icons";
let initialState = { user: "", tables: [], market: "" };

const StyledSubmit = styled.div`
  display: flex;
  align-items: center;
  padding: 30px;
  margin: 30px;
  border-radius: 5px;
  background-color: white;
  z-index: 100;
  border-bottom: 2px solid lightgray;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  flex-direction: column;
  width: 500px;
  margin: 30px auto;
`;

const dataValidation = (options, markets) => {
  return [
    { field: "user", type: "text" },
    {
      field: "tables",
      type: "select",
      options,
      selectObject: {
        key: "id",
        show: "table_type",
        value: "id"
      },
      multiple: true,
      noOther: true
    },
    {
      field: "market",
      type: "select",
      label: "Market",
      options: markets,
      selectObject: {
        key: "market_id",
        show: "name",
        value: "market_id"
      },
      noOther: true
    }
  ];
};
const tableHeaders = [
  { id: "1", label: "User", key: "user" },
  {
    id: "2",
    label: "Permissions",
    key: "nightly_report_tables",
    arrayVal: "table_type"
  },
  {
    id: "3",
    label: "Market",
    key: "market"
  },
  { id: "4", label: <Edit />, key: "edit", sortless: true }
];

const AuthPage = () => {
  const [addUser] = useMutation(ADD_USER);
  const { loading, error, data } = useQuery(ALL_USERS);
  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  console.log(userData);
  if (loading) return <OtherLoader />;
  if (error) return <div>error</div>;

  const submitUser = async () => {
    let { user, tables: tablesData, market } = userData;
    if (!tablesData.length) {
      setErrors(["No Permissions Selected"]);
      return;
    }
    if (!user || !market) {
      setErrors(["Please Enter Email and Default State"]);
      return;
    }

    let tables = tablesData.reduce((arr, curr) => {
      arr.push({ table: curr });
      return arr;
    }, []);
    setSubmitting(true);
    try {
      await addUser({
        variables: { tables, user, market: +market },
        refetchQueries: [{ query: ALL_USERS }]
      });
      setModalOpen(true);
      setSubmitting(false);
      setUserData(initialState);
    } catch (err) {
      setErrors(["An Error Occurred"]);
      setSubmitting(false);
    }
  };

  const reducedData = data.allUsers.reduce((arr, curr) => {
    arr.push({
      ...curr,
      market: curr.all_market.name,
      edit: <Edit onClick={() => setEditModal(curr)} />
    });
    return arr;
  }, []);

  return (
    <>
      <StyledSubmit>
        <h1>Authorizations</h1>
        <Reformed
          style={{ margin: "0 auto", flexDirection: "column", width: "100%" }}
          flex="25%"
          data={userData}
          setData={setUserData}
          dataValidation={dataValidation(data.allTables, data.allMarkets)}
        />
        {errors.length ? errors.map(err => <p key={err}>{err}</p>) : null}
        <StyledButton disabled={submitting} onClick={() => submitUser()}>
          SUBMIT{submitting && "ING"}
        </StyledButton>
      </StyledSubmit>
      <StyledSubmit style={{ width: "90%" }}>
        <Table
          localStorageVal="authTable"
          initialSearch="user"
          data={reducedData}
          tableHeaders={tableHeaders}
        />
      </StyledSubmit>
      <SuccessModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        specialText="SUCCESSFULLY ADDED"
      />
      {editModal && (
        <EditModal
          allTables={data.allTables}
          allMarkets={data.allMarkets}
          modalOpen={editModal}
          setModalOpen={() => setEditModal(false)}
          setSuccessModalOpen={() => setModalOpen(true)}
        />
      )}
    </>
  );
};

export default AuthPage;
