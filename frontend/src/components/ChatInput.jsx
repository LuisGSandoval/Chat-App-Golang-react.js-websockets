import React, { useContext } from "react";
import { CTX } from "../state/Store";

import { sendMsg } from "../api/index";

const ChatInput = () => {
  const [store, dispatch] = useContext(CTX);

  function sendMsgs(e) {
    e.preventDefault();
    sendMsg(store.addedMsg);
    dispatch({
      type: "UPDATE_MESSAGE_INPUT",
      payload: ""
    });
  }
  function addMsg(e) {
    dispatch({
      type: "UPDATE_MESSAGE_INPUT",
      payload: e.target.value
    });
  }

  return (
    <div className="bg-secondary px-4 py-2 message-input">
      <form onSubmit={sendMsgs}>
        <label className="sr-only" htmlFor="msg">
          Username
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <span role="img" aria-label="msg">
                📩
              </span>
            </div>
          </div>
          <input
            type="text"
            className="form-control"
            id="msg"
            placeholder="Envía un mensaje"
            value={store.addedMsg}
            onChange={addMsg}
          />
          <div className="input-group-apend m-0 p-0">
            <div className="input-group-text bg-success  rounded-0 border border-success">
              <button
                type="submit"
                className="btn btn-success m-0 p-0 border-0 "
              >
                <span role="img" aria-label="msg">
                  ENVIAR
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
