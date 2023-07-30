import React from "react";

import { styled, css } from "styled-components";
const BadgeContainer = styled.div`
  text-transform: uppercase;
  border-radius: 4px;
  ${({ variant }) =>
    variant === "win" &&
    css`
      background: #125c51;
    `};
  ${({ variant }) =>
    variant === "loss" &&
    css`
      background: #fa698b;
    `};
  ${({ variant }) =>
    variant === "long" &&
    css`
      border: 1px solid #125c51;
    `};
  ${({ variant }) =>
    variant === "short" &&
    css`
      border: 1px solid #fa698b;
    `};
  padding: 5px 10px;
  text-align: center;
`;

function Badge({ variant }) {
  return <BadgeContainer variant={variant}>{variant}</BadgeContainer>;
}

export default Badge;
