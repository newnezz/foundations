import React, { useState } from "react";
import styles from './App.module.css';

const App = () => {
  const [text, setText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // pull in data to display, below is just fake data for now
  // cRud = > Read
  const [fakeData, setFakeData] = useState([
    {
      id: 1,
      title: "Go to the store",
    },
    {
      id: 2,
      title: "Develop an app",
    },
    {
      id: 3,
      title: "Create a windsword",
    },
  ]);

  const inputGood = () => {
    if (text.trim() === "") {
      return "Cannot be empty";
    }
    if (fakeData.find((item) => item.title === text.trim())) {
      return "Duplicate Entry";
    }
    return "good";
  };

  const handleAdd = () => {
    if (inputGood() == "good") {
      setFakeData([...fakeData, { id: fakeData.length + 1, title: text }]); // Crud > create
      setText("");
    } else {
      alert(inputGood());
    }
  };
  const handleUpdate = () => {
    alert("Saves to database, not yet implemented"); // crUd > update
  };

  const handleDelete = (id) => {
    setFakeData(fakeData.filter((item) => item.id !== id));
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className={styles.container}>
          Simple To Do List
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {fakeData.map((item, key) => {
              return (
                <div style={{ display: "flex", gap: "10px" }}>
                  <li key={item.id}>{item.title}</li>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              );
            })}
          </ul>
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></input>
          <button onClick={handleAdd}>Add New</button>
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          LOG IN STUFF
        </>
      )}
    </div>
  );
};

export default App;
