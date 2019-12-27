import styled from 'styled-components';

const TabListItem = styled.li`
  font-size: 18px;
  list-style: none;
  position: relative;
  margin-bottom: -1px;
  padding: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: ${props => props.theme.font};
  letter-spacing: 0.8px;
  line-height: 36px;
  background-color: #ffffff;
  border-bottom: 2px solid ${props => props.theme.backgroundLightGrey};
  transition: 0.5s all;
  width: ${props => props.width};
  color: ${props =>
    props.label === 'Incidents' && props.reviewLevel && props.theme.alertRed};
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #1c344c;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }
  &:hover::before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
  &:first-child {
    border-radius: 5px 0 0 0;
  }
  &:last-child {
    border-radius: 0 5px 0 0;
  }

  &:hover {
    cursor: pointer;
    color: #1c344c;
    transition: all 0.3s ease-in-out;
  }
`;

const ActiveTabListItem = styled(TabListItem)`
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: ${props =>
      props.label === 'Incidents' && props.reviewLevel
        ? props.theme.alertRed
        : '#1c344c'};
    visibility: visible;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 8px;
  width: ${props => props.width};

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 0 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 0 6px rgba(0, 0, 0, 0.23);
  ol {
    padding-left: 0;
    padding-right: 0;
    margin-top: 0;
    width: 100%;
    text-align: center;
    border-radius: 5px;
    display: flex;
    color: #6f7d8b;
  }
  .tab-content {
    display: ${props => props.justified && 'flex'};
    justify-content: ${props => props.justified && 'center'};
    overflow-x: auto;
    margin-left: 20px;
    margin-right: 20px;
    display: ${props => props.flexTabContent && 'flex'};
  }
`;

export { TabListItem, TabsContainer, ActiveTabListItem };
