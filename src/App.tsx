import { RouterProvider } from "react-router-dom";
import { router } from "@/router";

function App() {
  //레이아웃 형식을 정의해야 할 수도 있어서 App.tsx에 routerProvider 추가
  return <RouterProvider router={router} />;
}

export default App;
