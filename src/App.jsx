import React, { useState, useEffect, useCallback } from "react";
import styles from "./App.module.css";
import supabase from "../Utils/supabase";

const App = () => {
  const [text, setText] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [todolist, setTodoList] = useState([]);
  let user = undefined;

  useEffect(() => {});

  useEffect(() => {
    checkSession();

    console.log("user", user);

    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select();

      if (error) {
        console.error(error);
        setTodoList([]);
        return;
      }

      if (data) {
        setTodoList(data);
        console.log("fetched list", data);
      }
    };

    loggedIn && fetchTodos();
  }, [loggedIn]);

  const checkSession = async () => {
    const { data: session, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error fetching session:", error);
      return;
    }

    if (session.session) {
      console.log("Session exists:", session);
      // Set session to true or store the user's info in state
      setLoggedIn(true);
      user = session.user; // Optional: Save user details
    } else {
      console.log("No active session");
      setLoggedIn(false);
    }
  };

  const handleAdd = useCallback(async () => {
    console.log("handleadd user", user);
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
      console.log(data);
      setTodoList([...todolist, { id: todolist.length + 1, title: text }]); // Crud > create
      setText("");
    }
  });

  const handleUpdate = async () => {
    // const { data, error } = await supabase
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (!error) {
      setTodoList(todolist.filter((item) => item.id !== id));
    } else {
      console.error(error);
    }
  };

  const onCompleted = (item) => {
    setTodoList(
      todolist.map((dataItem) =>
        dataItem.id === item.id
          ? { ...dataItem, completed: !dataItem.completed } // Toggle completed status
          : dataItem,
      ),
    );
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error);
      setSession(false);
      return;
    }
    if (data) {
      setSession(true);
      user = data.session.user;
      console.log(data);
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
      user = data.session.user;
      console.log("handle login data", data);
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
