import React, { useState, useContext } from "react";
import styled from "styled-components";
import { CrewContext } from "./EditTeams";
import { useMutation } from "@apollo/react-hooks";
import CHANGE_CREW_TEAM from "../../graphql/mutations/changeCrewTeam";
import CREATE_CREW_TEAM_MEMBER from "../../graphql/mutations/createCrewTeamMember";
import REMOVE_CREW_MEMBER from "../../graphql/mutations/removeCrewMember";
import ALL_INSTALLERS from "../../graphql/queries/allInstallers";
import { DeleteForeverOutlined, DragIndicator } from "@material-ui/icons";
import BarLoader from "react-bar-loader";

const StyledHoverDrag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  border-radius: 5px;
  border: 2px solid #e9e9e9;
  margin: 5px 0;
  background: white;
  justify-content: space-evenly;
  opacity: ${props => (props.draggingStyle ? ".7" : 1)};
  color: ${props => props.theme.midnightBlue};
  .deleteCan {
    &:hover {
      opacity: 0.7;
    }
  }
  &:hover {
    background: #e9e9e9;
    border: 2px solid white;
  }
`;

const DraggableMember = styled.div`
  margin: 15px auto;
  width: fit-content;
  display: flex;
  flex-direction: row;
  text-align: center;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 10px #c0c0c0;
  align-items: center;
  padding: 0 1rem;
  color: ${props => props.theme.midnightBlue};
`;

const StyledDrag = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 0 auto;

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
    background: #f9f9f9;
    border-radius: 0.5rem;
    box-shadow: 5px 5px 10px #c0c0c0;
  }
  .drag-drop-zone p {
    color: #f5f5f5;
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
          <DragIndicator />
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
              <StyledHoverDrag
                draggingStyle={
                  dragging && y.crew_team_id === dragging.child.crew_team_id
                }
                draggable
                onDragStart={() =>
                  setDragging({ parent: arr.insCrewId, child: y })
                }
                onDragEnd={() => setDragging({ parent: "", child: "" })}
                key={y.crew_team_id}
              >
                {y.FLDINST_USER.FULL_NAME}
                <DeleteForeverOutlined
                  className="deleteCan"
                  //   style={{ color: "white" }}
                  onClick={() => removeMember(y.crew_team_id)}
                />
              </StyledHoverDrag>
            ))}
          </div>
        ))}
      </StyledDrag>
    </div>
  );
};

export default DragComponent;
