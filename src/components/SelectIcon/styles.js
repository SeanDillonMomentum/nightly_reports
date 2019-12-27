import styled from "styled-components";

const SelectIconContainer = styled.div`
  margin-right: ${props => (props.marginRight ? props.marginRight : null)};
  .menuIcon {
    padding: 18px 20px;
    border-radius: 0px;
    max-height: 64px;
    color: ${props => props.theme.midnightBlue};
  }
  .menuIconSizing {
    font-size: 30px;
  }
`;
export { SelectIconContainer };
