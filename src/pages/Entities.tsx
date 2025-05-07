import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getAllEntities, deleteEntity, updateEntity } from "../entities";
import type { Entity } from "../types/Entity";
import EntityCard from "../components/ui/EntityCard";
import Modal from "../components/ui/Modal";

export default function Entities(): JSX.Element {
  const navigate = useNavigate();
  const [entities, setEntities] = useState<Array<Entity>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedEntityId, setSelectedEntityId] = useState<number | null>(null);

  // Загружаем сущности при монтировании компонента
  useEffect(() => {
    const fetchEntities = async (): Promise<void> => {
      try {
        const entities = await getAllEntities();
        setEntities(entities);
      } catch (error) {
        console.error("Ошибка при загрузке сущностей:", error);
      }
    };

    void fetchEntities();
  }, []);

  // Удаление сущности
  const handleDeleteClick = (id: number): void => {
    setSelectedEntityId(id);
    setShowModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (selectedEntityId !== null) {
      try {
        await deleteEntity(selectedEntityId);
        setEntities((prevEntities) =>
          prevEntities.filter((entity) => entity.id !== selectedEntityId)
        );
        setShowModal(false);
        alert("Сутність успішно видалена!");
      } catch (error) {
        console.error("Ошибка при удалении сущности:", error);
      }
    }
  };

  // Редактирование сущности
  const handleEdit = async (entity: Entity): Promise<void> => {
    const updatedTitle = prompt("Введіть нову назву:", entity.title);
    if (updatedTitle === null || updatedTitle.trim().length < 3) {
      alert("Назва повинна містити щонайменше 3 символи.");
      return;
    }

    const updatedContent = prompt("Введіть новий опис:", entity.content);
    if (updatedContent === null || updatedContent.trim().length < 10) {
      alert("Опис повинен містити щонайменше 10 символів.");
      return;
    }

    const updatedEntity = {
      ...entity,
      title: updatedTitle.trim(),
      content: updatedContent.trim(),
    };

    try {
      const result = await updateEntity(entity.id, updatedEntity);
      if (result) {
        setEntities((prevEntities) =>
          prevEntities.map((currentEntity) =>
            currentEntity.id === entity.id ? result : currentEntity
          )
        );
        alert("Сутність успішно оновлена!");
      }
    } catch (error) {
      console.error("Ошибка при обновлении сущности:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-3 text-center">Перелік сутностей:</h1>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            <EntityCard
              entity={entity}
              onEdit={() => void handleEdit(entity)}
              onDetails={() => void navigate({ to: `/entities/${entity.id}` })}
              onDelete={() => void handleDeleteClick(entity.id)}
            />
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-3xl mx-auto my-5 block font-bold text-2xl"
        onClick={() => navigate({ to: "/entities/new" })}
      >
        Створити новий екземпляр
      </button>
      <Modal
        bodyMessage="Ви впевнені, що хочете видалити цей елемент?"
        headerMessage="Підтвердження видалення"
        show={showModal}
        onCancel={() => setShowModal(false)}
        onConfirm={() => void confirmDelete()}
      />
    </>
  );
}

