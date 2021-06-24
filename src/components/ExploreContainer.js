import React from "react";
import axios from "axios";
import "./ExploreContainer.css";

// Ionic imports
import { IonInput, IonButton } from "@ionic/react";

const ExploreContainer = () => {
  const [todo, setTodo] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [id, setId] = React.useState("");
  const [postedData, setPostedData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = { title, body, id };
    const config = {
      headers: { "Content-type": "application/json; charset=UTF-8" },
    };

    const { data: postResult } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      data,
      config
    );
    setPostedData(postResult);
    setLoading(false);
  };

  React.useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(({ data }) => setTodo(data));
  }, [postedData]);

  return (
    <div className="container">
      {todo && (
        <React.Fragment>
          <h1>Hello world</h1>
          <h2>
            <strong>User ID: </strong>
            {todo.userId}
          </h2>
          <h2>
            <strong>Document ID: </strong>
            {todo.id}
          </h2>
          <h2>
            <strong>Title: </strong>
            {todo.title}
          </h2>
          <h2>
            <strong>Completed: </strong>
            {todo.completed}
          </h2>
        </React.Fragment>
      )}
      <br />
      <h1>Create a post</h1>
      <IonInput
        value={title}
        onIonChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a title"
      />
      <IonInput
        value={body}
        onIonChange={(e) => setBody(e.target.value)}
        placeholder="Enter a description"
      />
      <IonInput
        value={id}
        onIonChange={(e) => setId(e.target.value)}
        placeholder="Enter a id"
      />{" "}
      <IonButton onClick={handleSubmit}>Submit</IonButton>
      <div
        style={{ border: "2", borderColor: "#000000", borderStyle: "solid" }}
      >
        {postedData ? (
          <React.Fragment>
            <h4>Title: {postedData.title}</h4>
            <h4>Body: {postedData.body}</h4>
            <h4>ID: {postedData.id}</h4>
          </React.Fragment>
        ) : (
          <h4>No data has been posted yet</h4>
        )}
        {loading && <h1>Loading data that you just posted</h1>}
      </div>
    </div>
  );
};

export default ExploreContainer;
