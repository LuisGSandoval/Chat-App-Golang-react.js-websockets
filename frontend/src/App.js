import React, { useEffect, useContext } from "react";
import { connect } from "./api/index";
import Header from "./components/Header";
import Chathistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import { CTX } from "./state/Store";
function App() {
  const [state, dispatch] = useContext(CTX);

  useEffect(() => {
    connect(msg => {
      let msgData = JSON.parse(msg.data);
      let d = new Date();
      let obj = {
        date: `${d.getHours()} : ${d.getMinutes()} : ${d.getSeconds()}`,
        body: msgData.body
      };
      if (msgData.type === 1) {
        dispatch({
          type: "LOAD_MESSAGES",
          payload: [...state.msgs, obj]
        });
      } else if (msgData.type === 2) {
        dispatch({
          type: "LOAD_NOTIFICATIONS",
          payload: [obj, ...state.notifs]
        });
      }
    });
  }, [state.msgs, state.notifs, dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Chathistory />
        <ChatInput />
      </header>
    </div>
  );
}

export default App;
