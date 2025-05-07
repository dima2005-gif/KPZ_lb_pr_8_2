import type { Entity } from "../../../types/Entity";

interface Props {
  entity: Entity;
  onEdit: () => void;
  onDelete: () => void;
  onDetails: () => void;
}

export default function EntityCard({ entity, onEdit, onDelete, onDetails }: Props): JSX.Element {
  return (
    <div className="p-4 border border-blue-500 rounded-lg bg-gray-800 text-white">
      <h2 className="text-xl font-bold">
        <strong>Назва:</strong> {entity.title}</h2> {/* Было `entity.name`, теперь `entity.title` */}
      <p className="text-gray-300">
        <strong>Опис:</strong> {entity.content}</p> {/* Было `entity.description`, теперь `entity.content` */}
      <p className="text-sm text-gray-500 mt-2">
        <strong>ID:</strong> {entity.id}
      </p>

      {/* Кнопки */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-bold w-1/3"
          onClick={onEdit}
        >
          Редагування
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold w-1/3 mx-2"
          onClick={onDetails}
        >
          Детально
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold w-1/3"
          onClick={onDelete}
        >
          Видалити
        </button>
      </div>
    </div>
  );
}
