import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import supabase from "../Utils/supabase";

const App = () => {
  const [text, setText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [todolist, setTodoList] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {});

  useEffect(() => {
    checkSession();

    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select()
        .eq("user_id", user);

      if (error) {
        console.error(error);
        setTodoList([]);
        return;
      }

      if (data) {
        setTodoList(data);
        console.log("fetched data", data);
      }
    };

    if (loggedIn && user) {
      fetchTodos();
    }
  }, [loggedIn, user]);

  const checkSession = async () => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error);
      return;
    }

    if (session.session) {
      // Set session to true or store the user's info in state
      setLoggedIn(true);
      setUser(session.session.user); // Optional: Save user details
      console.log("user", user);
    } else {
      setLoggedIn(false);
    }
  };

  const handleAdd = async () => {
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          completed: false,
          title: text,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      console.log("handle add", data);
      setTodoList([...todolist, { id: data[0].id, title: text }]); // Crud > create
      setText("");
    }
  };

  const handleDelete = async (id) => {
    console.log("deleted id", id);
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) {
      setTodoList(todolist.filter((item) => item.id !== id));
      console.log("success deletion!");
    } else {
      console.error(error);
    }
  };

  const onCompleted = (item) => {
    // setTodoList(
    //   todolist.map((dataItem) =>
    //     dataItem.id === item.id
    //       ? { ...dataItem, completed: !dataItem.completed } // Toggle completed status
    //       : dataItem,
    //   ),
    // );
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error);
      setLoggedIn(false);
      return;
    }
    if (data) {
      console.log(data.user.id);
      setLoggedIn(true);
      setUser(data.user.id);
    }
  };

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error);
      setLoggedIn(false);
      return;
    }
    if (data) {
      setLoggedIn(true);
      setUser(data.session.user);
    }
  };

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    setLoggedIn(false);
    if (error) console.error(error);
  };

  return (
    <div className={styles.container}>
      {loggedIn ? (
        <div>
          Simple To Do List
          {/* <p style={{fontSize: '14px'}}>User: {user.email}</p> */}
          <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {todolist.map((item, key) => {
              return (
                <div style={{ display: "flex", gap: "10px" }}>
                  <li
                    key={item.id}
                    onClick={() => onCompleted(item)}
                    style={{ textDecoration: item.completed && "line-through" }}
                  >
                    {item.title}
                  </li>
                  <i
                    class="fa fa-trash"
                    onClick={() => handleDelete(item.id)}
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
            ></input>
            <div className="buttons">
              <button onClick={handleAdd}>Add New</button>
              <button onClick={handleLogOut}>Log Out</button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h4 style={{ textAlign: "center", margin: 0 }}>Sign Up / Login</h4>
          <input
            type="text"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
