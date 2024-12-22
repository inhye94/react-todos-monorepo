import { css } from "@emotion/react";
import { forwardRef } from "react";
import type { TInputAttrType } from "./form";
import Input from "./Input";

interface ITextInputFieldProps extends Omit<TInputAttrType, "name"> {
  name: string;
  label: string;
}

const TextInputField = forwardRef<HTMLInputElement, ITextInputFieldProps>(
  ({ name, label, ...props }, ref) => {
    return (
      <div css={fieldStyle}>
        <label css={labelStyle} htmlFor={name}>
          {label}
        </label>
        <Input ref={ref} name={name} id={name} {...props} />
      </div>
    );
  }
);

export default TextInputField;

// styles
const fieldStyle = css`
  margin: 4px 0;
`;

const labelStyle = css`
  display: inline-block;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;
