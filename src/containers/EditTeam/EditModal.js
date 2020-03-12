import React, { useState, useContext } from "react";
import ModalComponent from "../../components/Modal/Modal";
import Reformed from "reformed-material";
import { useMutation } from "@apollo/react-hooks";
import { StyledButton } from "../Home/styles";
import { CrewContext } from "./EditTeams";
import ALL_INSTALLERS from "../../graphql/queries/allInstallers";
import CREATE_INSTALL_CREW from "../../graphql/mutations/createInstallCrew";
// import ALL_INSTALL_CREWS from "../../graphql/queries/allInstallCrews";
import { FormCard } from "../../utils/styledComps/styledComps";

const initialData = market_id => {
  return {
    name: "",
    market_id
  };
};

const dataValidation = options => [
  { field: "name", type: "text" }
  //   {
  //     field: "market_id",
  //     type: "select",
  //     options,
  //     selectObject: {
  //       key: "market_id",
  //       value: "market_id",
  //       show: "name"
  //     },
  //     noOther: true
  //   }
];

const EditModal = ({
  modalOpen,
  setModalOpen,
  setSuccessModalOpen,
  permissions
}) => {
  const { allMarkets } = useContext(CrewContext);
  const [submittalError, setSubmittalError] = useState("");
  const [createInstallCrew] = useMutation(CREATE_INSTALL_CREW, {
    refetchQueries: [
      {
        query: ALL_INSTALLERS,
        variables: { market_id: +permissions.all_market.market_id }
      }
    ]
  });
  const [submitting, setSubmitting] = useState("");
  const [teamData, setTeamData] = useState(
    initialData(permissions.all_market.market_id)
  );

  const submitNewTeam = async () => {
    setSubmitting(true);
    try {
      await createInstallCrew({
        variables: { ...teamData, market_id: +teamData.market_id }
      });
      setModalOpen("");
      setSuccessModalOpen("Successfully Added");
      setSubmitting(false);
      setTeamData(initialData(permissions.all_market.market_id));
    } catch (err) {
      setSubmittalError("An Error Occurred While Submitting");
      setSubmitting(false);
    }
  };

  return (
    <ModalComponent
      width="50%"
      openState={modalOpen}
      handleClose={setModalOpen}
    >
      <FormCard style={{ width: "auto", margin: 0 }}>
        <h1>Add Team</h1>
        <Reformed
          data={teamData}
          setData={setTeamData}
          dataValidation={dataValidation(allMarkets)}
          flex="50%"
        />
        {submittalError && <div>{submittalError}</div>}
        <StyledButton disabled={submitting} onClick={submitNewTeam}>
          SUBMIT{submitting && "TING"}
        </StyledButton>
      </FormCard>
    </ModalComponent>
  );
};

export default EditModal;
