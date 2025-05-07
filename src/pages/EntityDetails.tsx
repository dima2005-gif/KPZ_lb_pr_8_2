import { useLoaderData } from "@tanstack/react-router";
import type { Entity } from "../types/Entity";

export default function EntityDetails(): JSX.Element {
  const entity = useLoaderData<Entity>({ from: "/entities/$id" });

  // Отладочная информация
  console.log("Entity data:", entity);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Деталі сутності</h1>
      <ul className="space-y-2">
        <li>
          <strong>ID:</strong> {entity.id}
        </li>
        <li>
          <strong>Назва:</strong> {entity.title}
        </li>
        <li>
          <strong>Опис:</strong> {entity.content}
        </li>
      </ul>
    </div>
  );
}

