import React, { useState } from "react";
import Arrow from "./icons/arrow.png";
// import { testJson } from "./constant";
import { Switch, Route, useHistory } from "react-router-dom";
import FolderComponent from "./components/FolderComponent";
import "./App.scss";

export const FolderDataContext = React.createContext();

const App = () => {
  const history = useHistory();
  const [folderName, setFolderName] = useState([]);

  console.log("history", history);

  return (
    <FolderDataContext.Provider
      value={{
        data: folderName,
        setFolderName: (value) => setFolderName(value),
      }}
    >
      <div className="App">
        <div className="arrow-container">
          <img src={Arrow} alt="left" onClick={() => history.goBack()} />
          <img
            src={Arrow}
            alt="right"
            className="right"
            onClick={() => history.goForward()}
          />
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <FolderComponent folders={folderName} {...props} />
            )}
          />
          {folderName.map((item) => {
            return (
              <Route
                exact
                path={`/${item.fileName}`}
                render={(props) => (
                  <FolderComponent
                    folders={item.children || []}
                    parentId={item.id}
                    {...props}
                  />
                )}
              />
            );
          })}
        </Switch>
      </div>
    </FolderDataContext.Provider>
  );
};

export default App;
