import React, { useState } from "react";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import Table from "../../components/TableNew/Table";
import Reformed from "../../components/Reformed/Reformed";
import { useQuery, useMutation } from "@apollo/react-hooks";
import ALL_TABLES from "../../graphql/queries/allTables";
import ALL_USERS from "../../graphql/queries/allUsers";
import ADD_USER from "../../graphql/mutations/addUser";
import { StyledButton } from "../Home/styles";

import styled from "styled-components";
import SuccessModal from "../../components/Modal/SuccessModal";
let initialState = { user: "", tables: [] };

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

const dataValidation = options => {
  return [
    { field: "user", type: "text" },
    { field: "tables", type: "array", options, optionsKey: "table_type" }
  ];
};
const tableHeaders = [
  { id: "1", label: "User", key: "user" },
  {
    id: "2",
    label: "Permissions",
    key: "nightly_report_tables",
    arrayVal: "table_type"
  }
];

const AuthPage = () => {
  const [addUser] = useMutation(ADD_USER);
  const { loading, error, data } = useQuery(ALL_TABLES);
  const { loading: loadingTwo, error: errorTwo, data: dataTwo } = useQuery(
    ALL_USERS
  );
  const [userData, setUserData] = useState(initialState);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (loading || loadingTwo) return <OtherLoader />;
  if (error || errorTwo) return <div>error</div>;

  const submitUser = async () => {
    let { user, tables: tablesData } = userData;
    if (!tablesData.length) {
      setErrors(["No Permissions Selected"]);
      return;
    }

    let tables = tablesData.reduce((arr, curr) => {
      arr.push({ table: curr });
      return arr;
    }, []);
    setSubmitting(true);
    try {
      await addUser({
        variables: { tables, user },
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

  return (
    <>
      <StyledSubmit>
        <h1>Authorizations</h1>
        <Reformed
          style={{ margin: "0 auto", flexDirection: "column", width: "100%" }}
          flex="25%"
          data={userData}
          setData={setUserData}
          dataValidation={dataValidation(data.allTables)}
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
          data={dataTwo.allUsers}
          tableHeaders={tableHeaders}
        />
      </StyledSubmit>
      <SuccessModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        specialText="SUCCESSFULLY ADDED"
      />
    </>
  );
};

export default AuthPage;
