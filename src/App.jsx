import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";

const App = () => {
  const [text, setText] = useState("");
  const [session, setSession] = useState();
  const supabase = createClient(
    "https://cymccahfqxuoirpkxlkh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bWNjYWhmcXh1b2lycGt4bGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODE4MDMsImV4cCI6MjA0OTk1NzgwM30.RG3mYI5xOVrktwft3-76Gwh88ak0iY-SMw8JMq1UH90",
  );

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const [fakeData, setFakeData] = useState([
    {
      id: 1,
      title: "Sample 1",
      completed: true,
    },
    {
      id: 2,
      title: "Sample 2",
      completed: false,
    },
    {
      id: 3,
      title: "Sample 3",
      completed: true,
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
      setFakeData([
        ...fakeData,
        { id: fakeData.length + 1, title: text, completed: false },
      ]);
      setText("");
    } else {
      alert(inputGood());
    }
  };

  const handleDelete = (id) => {
    setFakeData(fakeData.filter((item) => item.id !== id));
  };

  const onCompleted = (item) => {
    setFakeData(
      fakeData.map((dataItem) =>
        dataItem.id === item.id
          ? { ...dataItem, completed: !dataItem.completed }
          : dataItem,
      ),
    );
  };

  return (
    <div className={styles.container}>
      {session ? (
        <div>
          Simple To Do List
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {fakeData.map((item) => {
              return (
                <div key={item.id} style={{ display: "flex", gap: "10px" }}>
                  <li
                    onClick={() => onCompleted(item)}
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                      cursor: "pointer", // Indicates the item is clickable
                    }}
                  >
                    {item.title}
                  </li>
                  <i
                    className={`fa ${item.completed ? "fa-check-circle" : "fa-circle"}`}
                    onClick={() => onCompleted(item)}
                    style={{
                      cursor: "pointer", // Add pointer cursor for the icon
                      color: item.completed ? "green" : "gray",
                    }}
                  />
                  <i
                    className="fa fa-trash"
                    onClick={() => handleDelete(item.id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </div>
              );
            })}
          </ul>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <div className={styles.button}>
              <button onClick={handleAdd}>Add New</button>
            </div>
          </div>
        </div>
      ) : (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      )}
    </div>
  );
};

export default App;
