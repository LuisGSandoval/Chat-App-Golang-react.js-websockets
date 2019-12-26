import React, { useContext } from "react";
import { CTX } from "../state/Store";

const ChatHistory = () => {
  const [store] = useContext(CTX);

  return (
    <div className="bg-light">
      <div className="container">
        <h1 className="display-4">Chat history</h1>
      </div>

      <div className="bg-secondary mb-5">
        <div className="container p-3 ">
          <div className="table-responsive no-wrap mb-2">
            {store.notifs.map((not, ind) => (
              <span
                title={not.date}
                key={ind}
                className={`mr-3 badge badge-${
                  not.body === "User disconnected..." ? "danger" : "success"
                }`}
              >
                {not.body === "User disconnected..." ? "🚴🏻‍♀️" : "👨🏻‍💻"}
                {not.date}
              </span>
            ))}
          </div>
          {store.msgs.length > 0 &&
            store.msgs.map((msg, ind) => (
              <div className="card" key={ind}>
                <div className="card-body p-2" key={ind}>
                  {msg.body}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
