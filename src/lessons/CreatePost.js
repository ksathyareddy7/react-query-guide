import { useState } from "react";

export function CreatePost({ onSubmit, buttonText = "Submit" }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title });
    setTitle("");
  };

  return (
    <div>
      <h3>Create New Post</h3>
      <br />
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
        />
        <button className="btn btn-primary mt-3" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}
