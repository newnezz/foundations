import React, { useState,  useEffect } from "react";
import styles from './App.module.css';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'

const App = () => {
  const [text, setText] = useState("");
  const [session, setSession] = useState();
  const supabase = createClient('https://cymccahfqxuoirpkxlkh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bWNjYWhmcXh1b2lycGt4bGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzODE4MDMsImV4cCI6MjA0OTk1NzgwM30.RG3mYI5xOVrktwft3-76Gwh88ak0iY-SMw8JMq1UH90')

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      return () => subscription.unsubscribe()
    }, [])

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
      {session ? (
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
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      )}
    </div>
  );
};

export default App;
