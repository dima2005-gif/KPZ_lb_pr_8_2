import type { Entity } from "../types/Entity";
import api from "../api";

interface ApiResponse<T> {
  data: T;
  message: string;
}

// Получение всех сущностей с сервера
export const getAllEntities = async (): Promise<Array<Entity>> => {
  try {
    const response = await api.get<ApiResponse<Array<Entity>>>('/posts');
    console.log('Ответ API:', response.data);

    if (!Array.isArray(response.data.data)) {
      throw new Error('API вернуло некорректные данные: ожидался массив');
    }

    return response.data.data.map((item) => ({
      id: item.id,
      title: item.title, // Преобразуем `title` в `name`
      content: item.content, // Преобразуем `content` в `description`
      
    }));
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return [];
  }
};

// Получение сущности по ID с сервера
export const getEntityById = async (id: number): Promise<Entity | undefined> => {
  try {
    const response = await api.get<ApiResponse<Entity>>(`/posts/${id}`);
    console.log('Сущность с сервера:', response.data);

    return {
      id: response.data.data.id,
      title: response.data.data.title,
      content: response.data.data.content,
    
    };
  } catch (error) {
    console.error(`Ошибка при получении сущности с id ${id}:`, error);
    return undefined;
  }
};

// Создание новой сущности на сервере
export const createEntity = async (entity: Partial<Entity>): Promise<Entity | undefined> => {
  try {
    const response = await api.post<ApiResponse<Entity>>('/posts', {
      title: entity.title,
      content: entity.content,
    });

    console.log('Созданная сущность:', response.data);
    return {
      id: response.data.data.id,
      title: response.data.data.title,
      content: response.data.data.content,
    };
  } catch (error) {
    console.error('Ошибка при создании сущности:', error);
    return undefined;
  }
};

// Обновление сущности на сервере
export const updateEntity = async (id: number, data: Partial<Entity>): Promise<Entity | undefined> => {
  try {
    const response = await api.put<ApiResponse<Entity>>(`/posts/${id}`, {
      title: data.title,
      content: data.content,
      updatedAt: new Date().toISOString(),
    });

    console.log('Обновленная сущность:', response.data);
    return {
      id: response.data.data.id,
      title: response.data.data.title,
      content: response.data.data.content,

    };
  } catch (error) {
    console.error(`Ошибка при обновлении сущности с id ${id}:`, error);
    return undefined;
  }
};

// Удаление сущности на сервере
export const deleteEntity = async (id: number): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
    console.log(`Сущность с id ${id} успешно удалена`);
  } catch (error) {
    console.error(`Ошибка при удалении сущности с id ${id}:`, error);
  }
};

