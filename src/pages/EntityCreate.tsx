import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createEntity } from "../entities";

export default function EntityCreate(): JSX.Element {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (name.trim().length < 3 || description.trim().length < 10) {
      alert("Назва повинна містити щонайменше 3 символи, а опис — 10 символів.");
      return;
    }
    try {
      await createEntity({
        title: name,
        content: description,
      });
      await navigate({ to: "/entities" });
    } catch (error) {
      console.error("Error creating entity:", error);
    }
  };
  

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Створити сутність</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="name">Назва:</label>
          <input
            id="name"
            style={{ marginTop: "5px", padding: "8px", width: "100%" }}
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Опис:</label>
          <textarea
            id="description"
            rows={4}
            style={{ marginTop: "5px", padding: "8px", width: "100%" }}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            type="button"
            style={{
              backgroundColor: "#ccc",
              border: "none",
              cursor: "pointer",
              padding: "10px 20px",
            }}
            onClick={() => navigate({ to: "/entities" })}
          >
            Скасувати
          </button>
          <button
            type="submit"
            style={{
              backgroundColor: "#007bff",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "10px 20px",
            }}
          >
            Створити
          </button>
        </div>
      </form>
    </div>
  );
}
