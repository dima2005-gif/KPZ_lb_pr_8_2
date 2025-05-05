import type { Entity } from "../../../types/Entity";

interface Props {
  entity: Entity;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEdit?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function EntityCard({ entity, onClick, onEdit }: Props): JSX.Element {
  return (
    <div className="group relative bg-gradient-to-b from-gray-50 to-white border border-gray-300 rounded-xl p-5 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 group-hover:bg-blue-600 transition-colors duration-300" />

      {/* Content */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between text-[13px] text-gray-400">
          <span>ID: {entity.id}</span>
          <span>{new Date(entity.createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800">{entity.name}</h2>

        <p className="text-gray-600 text-sm">{entity.description}</p>

        <div className="text-[12px] text-gray-400 mt-2">
          Оновлено: {new Date(entity.updatedAt).toLocaleDateString()}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-blue-100 text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-200 transition-all duration-200"
            onClick={onEdit} // Перемещено в конец списка пропсов
          >
            ✏️ Редагувати
          </button>
          <button
            className="flex-1 bg-red-100 text-red-700 font-medium py-2 rounded-lg hover:bg-red-200 transition-all duration-200"
            onClick={onClick} // Перемещено в конец списка пропсов
          >
            🗑️ Видалити
          </button>
        </div>
      </div>

    </div>
  );
}
