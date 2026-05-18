import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter 앱 전체에서 라우팅 기능을 쓰겠다 */}
    <BrowserRouter basename="/wise-zoo-life">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
