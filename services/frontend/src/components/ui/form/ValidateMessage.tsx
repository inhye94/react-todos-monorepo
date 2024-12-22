import { css } from "@emotion/react";

export interface IValidateMessageProps {
  type?: "error" | "success";
  children?: React.ReactNode;
}

const ValidateMessage = ({
  type = "success",
  children,
}: IValidateMessageProps) => {
  if (!children) return;

  return <p css={[messageStyle, typeStyle[type]]}>{children}</p>;
};

export default ValidateMessage;

// styles
const messageStyle = css`
  font-size: 12px;
`;

const typeStyle = {
  error: css`
    color: #eb4444;
  `,
  success: css`
    color: #44e744;
  `,
};
