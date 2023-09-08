import styled from "styled-components";

export const Todos = styled.div`
  width: 600px;
  margin: 3rem auto;
  font-weight: 400;
`;

export const TodoHead = styled.div``;
export const TodoTitle = styled.div`
  font-size: 3.5rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 1rem;
`;

export const TodoInputArea = styled.div`
  display: flex;
  border: 1px solid #ddd;
  padding: 0.5rem;
`;
export const TodoCompleteToggleIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  padding: 0.5rem;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  color: #bbb;
  &.active {
    color: #666;
  }
`;
export const TodoInput = styled.input`
  flex: 1;
  font-size: 0.875rem;
  padding: 0.5rem;
`;

export const TodoMain = styled.div`
  border: 1px solid #eee;
  box-shadow: rgba(100, 100, 100, 0.15) 0px 15px 25px,
    rgba(100, 100, 100, 0.05) 0px 5px 10px;
`;
export const TodoList = styled.div``;
export const TodoItem = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    button {
      display: block;
    }
  }
  &.complete span {
    text-decoration: line-through;
    color: #999;
  }
`;
export const TodoItemCheckBox = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  font-size: 1.25rem;
  border: 1px solid #eee;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: green;
  &:hover {
    border: 1px solid #ccc;
  }
`;
export const TodoItemText = styled.span`
  flex: 1;
  padding: 0.5rem;
  user-select: none;
`;
export const TodoItemEditInput = styled.input`
  flex: 1;
  padding: 0.5rem;
`;
export const TodoItemDeleteButton = styled.button`
  display: none;
  font-size: 1.25rem;
  width: 2.25rem;
  cursor: pointer;
  color: #bbb;
  &:hover {
    color: #888;
  }
`;

export const TodoFooter = styled.div`
  padding: 1rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;
export const TodoCountText = styled.div``;
export const TodoFilter = styled.div`
  position: absolute;
  left: 50%;
  translate: -50% 0;
  display: flex;
  gap: 0.5rem;
`;
export const TodoFilterOption = styled.div`
  padding: 0 0.75rem;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover {
    border: 1px solid #f4e5e5;
  }
  &.active {
    border: 1px solid #ebbebe;
  }
`;
export const TodoClearCompleteButton = styled.button`
  cursor: pointer;
`;
