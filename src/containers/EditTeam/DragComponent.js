import React, { useState, useContext, useRef } from "react";
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
import { StyledDrag, DraggableMember, StyledHoverDrag } from "./styled";

const DragComponent = ({
  currentSelected,
  setCurrentSelected,
  permissions,
  setEditing
}) => {
  const ref = useRef(null);
  const { allInstallCrewsByMarket } = useContext(CrewContext);
  const [submitting, setSubmitting] = useState(false);
  const [dragging, setDragging] = useState("");
  const [newMemberDrag, setNewMemberDrag] = useState("");
  const [submittalError, setSubmittalError] = useState(false);
  const refetchQueries = [
    {
      query: ALL_INSTALLERS,
      variables: { market_id: +permissions.all_market.market_id }
    }
  ];

  const [removeCrewMember] = useMutation(REMOVE_CREW_MEMBER, {
    refetchQueries
  });
  const [createCrewTeamMember] = useMutation(CREATE_CREW_TEAM_MEMBER, {
    refetchQueries
  });
  const [changeCrewTeam] = useMutation(CHANGE_CREW_TEAM, {
    refetchQueries
  });

  //remove member and put back in queue on refetch;
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

  //create crew member and refetch;
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

  //change crews on drag;
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

  const onMouseMove = e => {
    const { clientX } = e;
    let endScroll =
      ref.current.scrollLeft + ref.current.clientWidth ===
      ref.current.scrollWidth;

    if (
      Math.abs(clientX - ref.current.getBoundingClientRect().left) < 100 &&
      ref.current.scrollLeft !== 0
    )
      ref.current.scrollLeft = ref.current.scrollLeft -= 5;
    if (
      Math.abs(clientX - ref.current.getBoundingClientRect().right) < 100 &&
      !endScroll
    )
      ref.current.scrollLeft = ref.current.scrollLeft += 5;
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
      <StyledDrag ref={ref}>
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
                  onDrag={onMouseMove}
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
