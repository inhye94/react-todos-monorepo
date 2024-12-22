import { css } from "@emotion/react";
import { Link } from "react-router-dom";

interface IAuthLink {
  guideMessage: string;
  text: string;
  path: string;
}

const AuthLink = ({ guideMessage, text, path }: IAuthLink) => {
  return (
    <div css={wrapperStyle}>
      <p>{guideMessage}</p>
      <Link to={path} css={linkStyle}>
        {text}
      </Link>
    </div>
  );
};

export default AuthLink;

// styles
const wrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 4px;
  font-size: 14px;
  color: #999;
  white-space: nowrap;
`;

const linkStyle = css`
  text-decoration: underline !important;
  transition: color 150ms ease-in-out;

  &:hover {
    color: #333;
  }
`;
