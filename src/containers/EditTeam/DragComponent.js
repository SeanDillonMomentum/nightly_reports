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
import Knight from "../../assets/Knights.svg";
import Shark from "../../assets/shark.svg";
import AddButton from "../../assets/AddButton.svg";
import { ReactSVG } from "react-svg";

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
  color: ${props => props.theme.black};
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
  color: ${props => props.theme.black};
`;

const StyledDrag = styled.div`
  display: flex;
  overflow: auto;
  margin: 15px auto;
  padding: 25px 0;

  .submittalError {
    color: red;
    margin: 0 auto;
    font-size: 16px;
  }
  .teamHeaderContainer {
    position: absolute;
    top: -15px;
    width: 100%;
    text-align: center;
    left: 0;
  }
  .teamHeaders {
    color: white;
    font-size: 24px;
    background: #181818;
    border-radius: 28px;
    padding: 10px 25px;
    margin: 0 auto;
    width: fit-content;
  }
  .drag-drop-zone {
    position: relative;
    margin: 15px;
    flex: 1 0 17%;
    padding: 2rem;
    text-align: center;
    background: #f7f7f7;
    border-radius: 8px;
    box-shadow: 19px 21px 24px -2px rgba(0, 0, 0, 0.16);
  }
  .drag-drop-zone-edit {
    margin: 15px;
    flex: 1 0 17%;
    padding: 2rem;
    text-align: center;
    background: #f2f2f2;
    border-radius: 8px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8d8d8d;
    &:hover {
      opacity: 0.7;
    }
  }
  .addIt {
    border-radius: 50%;
    border: 1px solid #8d8d8d;
    width: 60px;
    height: 60px;
    &:hover {
      opacity: 0.7;
    }
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
  .scrollContainer {
    overflow: auto;
    max-height: 250px;
  }
`;

const DragComponent = ({
  currentSelected,
  setCurrentSelected,
  permissions,
  setEditing
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
        <div className="drag-drop-zone-edit">
          <ReactSVG src={AddButton} onClick={() => setEditing(true)} />
          <div>Add Team</div>
        </div>
        {allInstallCrewsByMarket.map((arr, i) => (
          <div
            key={arr.insCrewId}
            className="drag-drop-zone"
            onDrop={handleDrop(arr.insCrewId)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <div className="teamHeaderContainer">
              <div
                className="teamHeaders"
                style={i !== 0 ? { backgroundColor: "#C8A84A" } : null}
              >
                {i === 0 ? "The Highlanders" : "Solar Sharks"}
              </div>
            </div>
            <ReactSVG
              src={i === 0 ? Knight : Shark}
              style={{ marginTop: "15px" }}
            />
            <h1>{arr.name}</h1>
            <div className="scrollContainer">
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
          </div>
        ))}
      </StyledDrag>
    </div>
  );
};

export default DragComponent;
