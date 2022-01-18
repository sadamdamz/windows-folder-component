import React, { useContext } from "react";
import Folder from "../icons/folder.png";
import Add from "../icons/add.png";
import { FolderDataContext } from "../App";
import "../App.scss";

/**
 * check whether the file name is duplicate
 */
const checkDuplicateName = (data, name = "") => {
  let isDuplicate = false;
  data.forEach((item) => {
    if (item.fileName === name) {
      isDuplicate = true;
    }
  });
  return isDuplicate;
};

const FolderComponent = (props) => {
  const { folders, history, parentId, location } = props;
  const { data, setFolderName } = useContext(FolderDataContext);

  const getValue = () => {
    let person = prompt("Please enter folder name:");
    let originalData = [...data];
    if (person.trim() && !checkDuplicateName(folders, person)) {
      if (parentId) {
        let mergedData = [
          ...folders,
          { id: Math.floor(Math.random() * 100000), fileName: person },
        ];
        originalData.forEach((item) => {
          if (item.id === parentId) {
            item.children = mergedData;
          }
        });
        setFolderName([...originalData]);
      } else {
        setFolderName([
          ...data,
          { id: Math.floor(Math.random() * 100000), fileName: person },
        ]);
      }
    }
  };

console.log('location', location)
  const redirect = (fileName) => {
    if(parentId) {
      history.push(`${location.pathname}/${fileName}`)
    } else {
      history.push(`/${fileName}`)
    }
  }

  return (
    <>
      <div className="add-file">
        <img src={Add} alt="addfiles" onClick={() => getValue()} />
      </div>
      {folders.length >= 0 && (
        <div className="folders-container">
          {folders.map((item, index) => {
            return (
              <div
                key={index}
                className="folder"
                onClick={() => redirect(item.fileName)}
              >
                <img src={Folder} alt="folders" />
                <p>{item.fileName}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FolderComponent;
