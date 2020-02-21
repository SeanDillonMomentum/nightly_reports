import React, { useState } from "react";
import ModalComponent from "../../components/Modal/Modal";
import Reformed from "reformed-material";
import { useMutation } from "@apollo/react-hooks";
import EDIT_USER from "../../graphql/mutations/editUser";
import ALL_USERS from "../../graphql/queries/allUsers";
import { StyledButton } from "../Home/styles";

const initialData = data => {
  return {
    user: data.user,
    _id: data.id,
    tables: data.nightly_report_tables.map(x => x.id),
    market: data.all_market.market_id
  };
};

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

const EditModal = ({
  modalOpen,
  setModalOpen,
  setSuccessModalOpen,
  allTables,
  allMarkets
}) => {
  const [editUser] = useMutation(EDIT_USER, {
    refetchQueries: [{ query: ALL_USERS }]
  });
  const [data, setData] = useState(initialData(modalOpen));
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitEdit = async () => {
    setLoading(true);
    try {
      await editUser({
        variables: {
          ...data,
          market: +data.market,
          tables: data.tables.map(y => +y)
        }
      });
      setLoading(false);
      setSuccessModalOpen("Successfully Edited");
      setModalOpen();
    } catch (err) {
      setError("An Error Occurred");
      setLoading(false);
    }
  };

  return (
    <ModalComponent
      width="50%"
      openState={modalOpen}
      handleClose={setModalOpen}
    >
      <Reformed
        flex={"100%"}
        data={data}
        setData={setData}
        dataValidation={dataValidation(allTables, allMarkets)}
      />
      {error && <div>{error}</div>}
      <StyledButton
        style={{ margin: "15px auto" }}
        disabled={loading}
        onClick={submitEdit}
      >
        SUBMIT{loading && "TING"} EDIT
      </StyledButton>
    </ModalComponent>
  );
};

export default EditModal;
