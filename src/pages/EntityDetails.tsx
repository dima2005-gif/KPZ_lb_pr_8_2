import { useLoaderData } from "@tanstack/react-router";
import type { Entity } from "../types/Entity";

export default function EntityDetails(): JSX.Element {
    const entity: Entity = useLoaderData({ from: '/entities/$id' });

    return (
        <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Деталі сутності</h1>
            <ul className="space-y-2">
                <li>
                    <strong>ID:</strong> {entity.id}
                </li>
                <li>
                    <strong>Назва:</strong> {entity.name}
                </li>
                <li>
                    <strong>Опис:</strong> {entity.description}
                </li>
                <li>
                    <strong>Створено:</strong> {new Date(entity.createdAt).toLocaleString()}
                </li>
                <li>
                    <strong>Оновлено:</strong> {new Date(entity.updatedAt).toLocaleString()}
                </li>
            </ul>
        </div>
    );
}