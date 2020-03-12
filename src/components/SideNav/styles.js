import styled from "styled-components";
import { Menu } from "@material-ui/icons";

export const StyledMenu = styled(Menu)`
    color: white;
    position: absolute;
    left: 12px;
    top: 15px;
    z-index:100;
    transform: rotate(${props => (props.rotation ? "0" : "90deg")});
    transition: transform 1s;
    &:hover {
      opacity: 0.7;
    }
    /* right: ${props => !props.open && "8px"}; */
  
`;

const StyledSidebar = styled.div`
  position: fixed;
  height: 100vh;
  transform: translateX(${props => (!props.open ? "-85px" : "0")});
  width: 135px;
  transition: all 0.5s;
  font-family: ${props => props.theme.font};
  background-color: ${props => props.theme.black};
  z-index: 1;
  overflow-y: auto;
  flex-direction: column;
  display: flex;
  /* overflow-y: hidden; */
  button {
    text-align: center;
    background-image: linear-gradient(
      ${props => props.theme.lightBlue},
      ${props => props.theme.cadetBlue}
    );
    width: 50%;
    padding: 20px 0;
    margin: 20px auto;
    border-radius: 20px;
    font-size: 18px;
    color: white;
    &:hover {
      opacity: 0.7;
    }
  }
 
  .iconText {
    list-style-type: none;
    font-size: 18px;
    color: white;
    /* color: ${props => props.theme.backgroundLightGrey}; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px 0;
  }
  .adminTextTop {
    padding: 3px 0;
    font-size: 24px;
  }
  .adminTextBottom {
    padding: 3px 0;
    font-size: 24px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 45px;
    border-top: 1px solid white;
  }
  img,
  svg {
    color: ${props => props.theme.backgroundLightGrey};
  }
  &::-webkit-scrollbar {
    overflow: hidden;
    width: 0px;
  }
  .chevron {
    padding: 0;
    position: absolute;
    right: 15px;
  }
`;

export default StyledSidebar;
