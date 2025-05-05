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

  useEffect(() => {
    const fetchEntities = async (): Promise<void> => {
      const entities = await getAllEntities();
      console.log('Сущности:', entities);
      setEntities(entities);
    };

    void fetchEntities();
  }, []);

  const navigateToCreateEntityPage = (): Promise<void> => {
    return navigate({ to: "/entities/new" });
  };

  const handleDeleteClick = (id: number): void => {
    setSelectedEntityId(id);
    setShowModal(true);
  };

  const confirmDelete = async (): Promise<void> => {
    if (selectedEntityId !== null) {
      deleteEntity(selectedEntityId);
      const updatedEntities = await getAllEntities();
      setEntities(updatedEntities);
      setShowModal(false);
    }
  };

  const handleEdit = (entity: Entity): void => {
    const updatedName = prompt("Введіть нову назву:", entity.name);
    if (updatedName === null || updatedName.trim().length < 3) {
      alert("Назва повинна містити щонайменше 3 символи.");
      return;
    }

    const updatedDescription = prompt("Введіть новий опис:", entity.description);
    if (updatedDescription === null || updatedDescription.trim().length < 10) {
      alert("Опис повинен містити щонайменше 10 символів.");
      return;
    }

    const updatedEntity = {
      ...entity,
      name: updatedName.trim(),
      description: updatedDescription.trim(),
      updatedAt: new Date().toISOString(),
    };

    updateEntity(entity.id, updatedEntity);

    setEntities((previousEntities) =>
      previousEntities.map((currentEntity) =>
        currentEntity.id === entity.id ? updatedEntity : currentEntity
      )
    );

    alert("Сутність успішно оновлена!");
  };

  return (
    <>
      <h1 className="text-3xl font-bold my-3 text-center">Перелік сутностей:</h1>
      <ul>
        {entities.map((entity) => (
          <li key={entity.id}>
            <EntityCard
              entity={entity}
              onClick={() => {
                handleDeleteClick(entity.id);
              }}
              onEdit={() => {
                handleEdit(entity);
              }}
            />
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-600 text-white px-5 py-3 rounded-3xl mx-auto my-5 block font-bold text-2xl"
        onClick={() => {
          void navigateToCreateEntityPage();
        }}
      >
        Створити новий екземпляр
      </button>
      <Modal
        bodyMessage="Ви впевнені, що хочете видалити цей елемент?"
        headerMessage="Підтвердження видалення"
        show={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={() => {
          void confirmDelete();
        }}
      />
    </>
  );
}