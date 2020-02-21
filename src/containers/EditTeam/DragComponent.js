import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CrewContext } from "./EditTeams";
import { useMutation } from "@apollo/react-hooks";
import CHANGE_CREW_TEAM from "../../graphql/mutations/changeCrewTeam";
import CREATE_CREW_TEAM_MEMBER from "../../graphql/mutations/createCrewTeamMember";
import REMOVE_CREW_MEMBER from "../../graphql/mutations/removeCrewMember";
import ALL_INSTALLERS from "../../graphql/queries/allInstallers";
import { DeleteForever } from "@material-ui/icons";
import BarLoader from "react-bar-loader";

const DraggableMember = styled.div`
  margin: 15px auto;
  width: 45%;
  padding: 2rem;
  text-align: center;
  background: #07f;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 10px #c0c0c0;
`;

const StyledDrag = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  flex-wrap: wrap;
  .submittalError {
    color: red;
    margin: 0 auto;
    font-size: 16px;
  }
  .drag-drop-zone {
    margin: 15px;
    flex: 1 0 17%;
    padding: 2rem;
    text-align: center;
    background: #07f;
    border-radius: 0.5rem;
    box-shadow: 5px 5px 10px #c0c0c0;
  }
  .drag-drop-zone p {
    color: #fff;
  }
  .drag-drop-zone.inside-drag-area {
    opacity: 0.7;
  }
  .dropped-files li {
    color: #07f;
    padding: 3px;
    text-align: left;
    font-weight: bold;
  }
  .hoverDrag {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    border-radius: 5px;
    margin: 5px 0;
    background-color: white;
    &:hover {
      opacity: 0.7;
    }
  }
`;

const DragComponent = ({
  currentSelected,
  setCurrentSelected,
  permissions
}) => {
  const { allInstallCrewsByMarket } = useContext(CrewContext);
  const [submitting, setSubmitting] = useState(false);
  const [dragging, setDragging] = useState("");
  const [newMemberDrag, setNewMemberDrag] = useState("");
  const [submittalError, setSubmittalError] = useState(false);

  const [removeCrewMember] = useMutation(REMOVE_CREW_MEMBER, {
    refetchQueries: [
      {
        query: ALL_INSTALLERS,
        variables: { market_id: +permissions.all_market.market_id }
      }
    ]
  });
  const [createCrewTeamMember] = useMutation(CREATE_CREW_TEAM_MEMBER, {
    refetchQueries: [
      {
        query: ALL_INSTALLERS,
        variables: { market_id: +permissions.all_market.market_id }
      }
    ]
  });
  const [changeCrewTeam] = useMutation(CHANGE_CREW_TEAM, {
    refetchQueries: [
      {
        query: ALL_INSTALLERS,
        variables: { market_id: +permissions.all_market.market_id }
      }
    ]
  });

  const removeMember = async crew_team_id => {
    setSubmitting(true);
    try {
      await removeCrewMember({ variables: { crew_team_id: +crew_team_id } });
      setSubmitting(false);
    } catch (err) {
      setSubmittalError("An Error Occurred");
      setSubmitting(false);
    }
  };

  const createCrewTeam = async variables => {
    setSubmitting(true);
    try {
      await createCrewTeamMember({ variables });
      setSubmitting(false);
    } catch (err) {
      setSubmittalError("An Error Occurred");
      setSubmitting(false);
    }
  };

  const submitCrewChange = async variables => {
    setSubmitting(true);
    try {
      await changeCrewTeam({ variables });
      setSubmitting(false);
    } catch (err) {
      setSubmittalError("An Error Occurred");
      setSubmitting(false);
    }
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = droppedId => async e => {
    e.preventDefault();
    e.stopPropagation();
    if (droppedId === dragging.parent) return;
    else if (currentSelected && newMemberDrag) {
      await createCrewTeam({
        crew_id: +droppedId,
        coad_id: currentSelected.COAD_ID
      });
      setCurrentSelected({ FULL_NAME: "" });
      setNewMemberDrag(false);
    } else {
      await submitCrewChange({
        crew_id: +droppedId,
        coad_id: dragging.child.coad_id,
        crew_team_id: +dragging.child.crew_team_id
      });
      setDragging("");
    }
  };

  return (
    <div>
      {currentSelected.FULL_NAME && (
        <DraggableMember draggable onDragStart={() => setNewMemberDrag(true)}>
          <h3>{currentSelected.FULL_NAME}</h3>
        </DraggableMember>
      )}
      {submitting && <BarLoader color="#1D8BF1" height="3" />}
      {submittalError && <div className="errorField">{submittalError}</div>}
      <StyledDrag>
        {allInstallCrewsByMarket.map(arr => (
          <div
            key={arr.insCrewId}
            className="drag-drop-zone"
            onDrop={handleDrop(arr.insCrewId)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <h1>{arr.name}</h1>
            {arr.crew_team_members.map(y => (
              <div
                className="hoverDrag"
                draggable
                onDragStart={() =>
                  setDragging({ parent: arr.insCrewId, child: y })
                }
                key={y.crew_team_id}
              >
                {y.FLDINST_USER.FULL_NAME}
                <DeleteForever
                  style={{ color: "red" }}
                  onClick={() => removeMember(y.crew_team_id)}
                />
              </div>
            ))}
          </div>
        ))}
      </StyledDrag>
    </div>
  );
};

export default DragComponent;
