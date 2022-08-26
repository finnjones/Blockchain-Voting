import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// module used to check if app runs without errors
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
