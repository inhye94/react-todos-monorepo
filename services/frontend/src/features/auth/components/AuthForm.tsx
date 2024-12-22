import { useForm } from "react-hook-form";
import { AuthPayloadType } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "../schema/auth";
import { useCallback } from "react";
import TextInputField from "../../../components/ui/form/TextInputField";
import Button from "../../../components/ui/button/BaseButton";
import { css } from "@emotion/react";
import ValidateMessage from "../../../components/ui/form/ValidateMessage";

interface IAuthFormProps {
  submitText: string;
  errorMessage: string;
  onPermit: (formData: AuthPayloadType) => void;
}

const AuthForm = ({ submitText, errorMessage, onPermit }: IAuthFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AuthPayloadType>({ resolver: zodResolver(authSchema) });

  const onSubmit = useCallback(
    (formData: AuthPayloadType) => {
      onPermit(formData);
      reset();
    },
    [onPermit, reset]
  );

  return (
    <form
      onSubmit={handleSubmit((formData) => onSubmit(formData))}
      css={formStyle}
    >
      <div>
        <TextInputField
          label="아이디"
          placeholder="아이디를 입력해주세요"
          {...register("email")}
        />
        <ValidateMessage type="error">{errors.email?.message}</ValidateMessage>
      </div>

      <div>
        <TextInputField
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          {...register("password")}
        />
        <ValidateMessage type="error">
          {errors.password?.message}
        </ValidateMessage>
      </div>

      <div css={buttonWrapperStyle}>
        <Button
          type="submit"
          css={buttonStyle}
          disabled={!isValid || isSubmitting}
        >
          {submitText}
        </Button>

        <ValidateMessage type="error">{errorMessage}</ValidateMessage>
      </div>
    </form>
  );
};

export default AuthForm;

// styles
const formStyle = css`
  display: flex;
  flex-direction: column;
`;

const buttonWrapperStyle = css`
  margin-top: 12px;
`;

const buttonStyle = css`
  width: 100%;
`;
