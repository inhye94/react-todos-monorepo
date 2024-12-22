import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div css={layoutStyle}>
      <Outlet />
    </div>
  );
};

export default AuthLayout;

// styles
const layoutStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  padding: 0 16px;

  h1,
  h2,
  h3 {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 32px;
    width: 100%;
    max-width: 300px;

    > * {
      width: 100%;
    }
  }
`;
