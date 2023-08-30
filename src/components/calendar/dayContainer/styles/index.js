import styled from "styled-components";

export const DayContainerWrapper = styled.div`
  color: #fff;
  overflow: hidden;
  // position: relative;
  background: #252b3d;

  display: flex;
  text-align: left;
  flex-direction: column;

  &.profit {
    background: #125c51;
    border-left: 2px solid #939393;
  }
  &.loss {
    background: #4f293f;
    border-left: 2px solid #939393;
  }

  .inner-container {
    padding: 10px 0 0 10px;
    display: flex;
    text-align: left;
    flex-direction: column;
    position: relative;

    span {
      position: absolute;
      top: -4px;
      border: 1px solid #7e7e7e;
      left: -1px;
      font-size: 1rem;
      padding-right: 2px;
      padding-left: 2px;
    }
  }
`;
