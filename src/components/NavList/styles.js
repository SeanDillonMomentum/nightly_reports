import styled from 'styled-components';

const Nav = styled.li`
  padding: 15px 0;
  width: 100%;
  background-color: ${props => props.active};
  display: flex;
  justify-content: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
  .navListOne {
    padding: 15px 0;
    margin-top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.12);
  }
  .dashboardText {
    text-align: center;
    font-size: 18px;
    text-decoration: none;
    color: #e3e9ee;
    display: flex;
    align-items: center;
    opacity: 0.7;
  }
  .dashboardTextActive {
    text-align: center;
    font-size: 18px;
    text-decoration: none;
    color: #e3e9ee;
    display: flex;
    align-items: center;
    opacity: 1;
  }
  .dashboardTextReview {
    text-align: center;
    font-size: 18px;
    text-decoration: none;
    color: #e3e9ee;
    display: flex;
    align-items: center;
    padding-left: 40px;
    opacity: 0.7;
  }
  .dashboardTextReviewActive {
    text-align: center;
    font-size: 18px;
    text-decoration: none;
    color: #e3e9ee;
    display: flex;
    align-items: center;
    padding-left: 40px;
    opacity: 1;
  }
`;

export { Nav };
