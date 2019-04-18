import * as React from "react";
import * as classnames from "classnames";
import * as styled from "styled-components";
import "../../../images/symbol-defs.svg";

const IconWrapper = styled.default.svg`
  height: 1em;
  width: 1em;
  vertical-align: middle;
  display: inline-block;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;
export interface IIconSVGProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

// Simple wrapper to render font icons as svgs.
export default function IconSVG(props: IIconSVGProps) {
  const { name, className, ...moreProps } = props;
  const iconClassName = classnames("icon-svg", name, className);
  const path = `${window.location.href}#symbol-defs_${name}`;

  return (
    <IconWrapper
      className={`${iconClassName}`}
      {...moreProps}
    >
      <use xlinkHref={path} />
    </IconWrapper>
  );
}
