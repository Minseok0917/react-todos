[Summary]

- storage hooks 만들기

[Feedback]

일단 컴포넌트 분리 + 컴포넌트 로직을 custom hooks로 분리하면 너가 원하는 조건이랑 순회가 이뻐지는건 좀 해결될듯

코드 보면서 나온거

1. storage 제어 관련 코드 분리하기
2. useState initialState 함수로 바꾸기
3. useState initialState는 storage 값 직접 참조 대신 외부 함수로 한번 감싸기 (localStorage.getItem("todos")가 아니라 그냥 getStoredTodos() 하면 알아서 Todo[]로 가져오도록, 나머지도 동일)
4. useMemo는 단순 배열 반복 레벨의 계산에서는 쓸 필요 없다. + 사실상 해당 컴포넌트가 작동하려면 거진 매번 todos가 바뀌어야 하는데(toggle, add, remove 다 todos를 수정함) 다 todos가 deps로 들어가 있기 때문에 사실상 useMemo 쓴게 손해일 수도 있음
5. todoRefs로 element를 저장해 직접 focus를 주는 대신 Input 컴포넌트 만들고 그 내부에서 mount 시에 직접 focus 처리하자
6. filterServices는 현재 형태로 할거라면 컴포넌트 외부로 빼고 함수 인자로 todos를 받는 식으로 하는게 좋을 듯
7. useEffect의 localStorage.setItem 저장 로직은 굳이 바로비로 처리해줄 필요 없으니 debounding도 할 겸 setTimeout 같은거로 감싸자
8. handlers object는 뭐 취향의 영역으로도 볼 수 있지만 리액트에서는 걍 함수로 만들어서 굳이 안쓰는게 좋을 듯
9. nextId 값은 state로 존재할 필요가 없음. 그냥 컴포넌트 외부에 IdGenerator 같은거 만들어서 써도 될 듯
10. toggleAllTodos에서는 이미 map으로 복사되기 때문에 spread를 사용할 필요 없다.
11. 지금 handler들을 보면 대부분 아래 형태인데 parameter로 받은 todo랑 setTodos([…todos])에 인과관계가 명확하지 않기 때문에 좋지 않은 코드임.
12. todos state 값 중 하나인 todo object를 함수 인자로 받음
13. reference를 참조하니 todo의 property를 직접 수정
14. 이후 그냥 setTodos([…todos]) 실행
    사실 이런 수정은 보통 immer 같은 lib이 쓰이는 환경이 대부분이긴 한데 직접 할거라면 id 같은 key를 받아서 아래 같은 방법으로 하는걸 추천함

```
todoEditBlur(id: string) => {
  const clone = structuredClone(todos); // clone
  const tg = clone.find(item => item.id === id); // Todo

  if (!tg) {
    throw Error("뭔가 잘못됨");
  }

  tg.edit = false; // toggle edit

  setTodos(clone);
}
```

12. $edit 부분은 checkbox에서 직접 제어하는 대신 TodoItem에 edit boolean을 넘겨서 container 레벨에서 표시 제어하는게 좋을 듯
13. EditInput, ItemText의 분기 부분은 컴포넌트 분리를 하면 복잡도가 많이 감소할 듯
14. TodoFilterOption은 수동으로 넣지 말고 array화 하는게 좋음
    14.1. filter option enum화 (all, active, complete)
    14.2 option들 배열 생성
    14.3 해당 배열 map 돌면서 Styled.TodoFilterOption 표시하기
