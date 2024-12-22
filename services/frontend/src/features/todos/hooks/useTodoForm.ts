import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoPayloadType } from "../todo";
import { todoMutations, todoQueries } from "../todosQuery";
import { TODO_URL } from "../constants/url";
import { useToastContext } from "../../../providers/ToastProvider";

const EMPTY_STRING = "";
const PRIORITY_INIT = "normal";

const INIT_FORM: TodoPayloadType = {
  title: EMPTY_STRING,
  content: EMPTY_STRING,
  priority: PRIORITY_INIT,
};

export const useTodoForm = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();

  const [formState, setFormState] = useState<TodoPayloadType>(INIT_FORM);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);

  const { data: todoDetail } = useQuery(todoQueries.detail(todoId));

  const { mutate: createTodo } = useMutation({
    ...todoMutations.create(),
    onSuccess(data) {
      setFormState(INIT_FORM);
      navigate(TODO_URL.DETAIL(data.id));
      queryClient.invalidateQueries({ queryKey: [...todoQueries.lists()] });
    },
  });
  const { mutate: updateTodo } = useMutation({
    ...todoMutations.update(),
    onSuccess(data) {
      showToast(`${data.title} 수정이 완료되었습니다.`, "success");
      navigate(TODO_URL.DETAIL(data.id));
      queryClient.invalidateQueries({ queryKey: [...todoQueries.lists()] });
      queryClient.invalidateQueries({
        queryKey: [...todoQueries.details(), todoId],
      });
    },
  });

  useEffect(
    function initTitleAndContent() {
      setFormState({
        title: todoDetail?.title || EMPTY_STRING,
        content: todoDetail?.content || EMPTY_STRING,
        priority: todoDetail?.priority || PRIORITY_INIT,
      });
    },
    [todoDetail]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const { title, content, priority } = formState;

    if (isEmpty(title)) {
      focusElem(titleRef);
      return false;
    }

    if (isEmpty(content)) {
      focusElem(contentRef);
      return false;
    }

    return true;
  }, [formState]);

  const handleSubmit = useCallback(() => {
    if (!validateForm()) return;

    const { title, content, priority } = formState;

    if (todoId) {
      updateTodo({ id: todoId, payload: { title, content, priority } });
    } else {
      createTodo({ title, content, priority });
    }
  }, [createTodo, formState, todoId, updateTodo, validateForm]);

  const cancel = useCallback(() => {
    navigate(TODO_URL.HOME);
  }, [navigate]);

  return {
    formState,
    titleRef,
    contentRef,
    cancel,
    handleChange,
    handleSubmit,
    todoId,
  };
};

function isEmpty(input: string) {
  return input.trim() === EMPTY_STRING;
}

function focusElem<T extends HTMLElement>(ref: React.RefObject<T>) {
  ref?.current?.focus();
}
