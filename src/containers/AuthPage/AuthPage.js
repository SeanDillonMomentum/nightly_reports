import React, { useState } from "react";
import OtherLoader from "../../components/OtherLoader/OtherLoader";
import Table from "../../components/TableNew/Table";
import Reformed from "../../components/Reformed/Reformed";
import { useQuery } from "@apollo/react-hooks";
import ALL_TABLES from "../../graphql/queries/allTables";
let initialState = { user: "", tables: [] };

const dataValidation = options => {
  return [
    { field: "user", type: "text" },
    { field: "tables", type: "array", options, optionsKey: "table_type" }
  ];
};

const AuthPage = () => {
  const { loading, error, data } = useQuery(ALL_TABLES);
  const [user, setUser] = useState(initialState);
  console.log(user);
  if (loading) return <OtherLoader />;
  if (error) return <div>error</div>;
  return (
    <div>
      <Reformed
        data={user}
        setData={setUser}
        dataValidation={dataValidation(data.allTables)}
      />
    </div>
  );
};

export default AuthPage;
