import styled from "styled-components";

export const EditCrewDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  .addIt {
    background-color: ${props => props.theme.black};
    color: white;
    border-radius: 50%;
    margin-left: 5px;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const StyledHoverDrag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  border: 2px solid #e9e9e9;
  margin: 5px 0;
  background: white;
  justify-content: space-between;
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

export const DraggableMember = styled.div`
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

export const StyledDrag = styled.div`
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
