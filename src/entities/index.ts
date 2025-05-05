import type { Entity } from "../types/Entity";
import api from "../api";

let entities: Array<Entity> = [
  { 
    id: 1, 
    name: 'Jotaro Kujo', 
    description: 'Stand: Star Platinum. Один з найпотужніших Stand\'ів, який володіє величезною силою та швидкістю. Може зупиняти час, має високу точність та силу в бою.', 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 2, 
    name: 'Joseph Joestar', 
    description: 'Stand: Hermit Purple. Використовує лозини для захоплення об\'єктів та отримання передбачень через карти Таро. Відзначається високою маневреністю та унікальними здібностями.', 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 3, 
    name: 'Muhammad Avdol', 
    description: 'Stand: Magician\'s Red. Вогонь! Цей Stand дозволяє керувати вогнем та створювати полум\'я для атаки, що робить Авдола потужним і небезпечним супротивником у бою.', 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 4, 
    name: 'Jean Pierre Polnareff', 
    description: 'Stand: Silver Chariot. Stand у вигляді лицаря з мечем, що володіє блискавичними атаками та високою швидкістю. Полнареф використовує його для швидкої та точної боротьби.', 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: 5, 
    name: 'Kakyoin Noriaki', 
    description: 'Stand: Hierophant Green. Керує довгими кінцівками для атак на відстані та високої точності. Мощний в обороні та атаці на дальні дистанції.', 
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

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
      name: item.title, // Преобразуем `title` в `name`
      description: item.content, // Преобразуем `content` в `description`
      createdAt: item.createdAt || new Date().toISOString(), // Преобразуем `created_at` в `createdAt`
      updatedAt: item.updatedAt || new Date().toISOString(), // Преобразуем `updated_at` в `updatedAt`
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
      name: response.data.data.title,
      description: response.data.data.content,
      createdAt: response.data.data.createdAt,
      updatedAt: response.data.data.updatedAt,
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
      title: entity.name,
      content: entity.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    console.log('Созданная сущность:', response.data);
    return {
      id: response.data.data.id,
      name: response.data.data.title,
      description: response.data.data.content,
      createdAt: response.data.data.createdAt,
      updatedAt: response.data.data.updatedAt,
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
      title: data.name,
      content: data.description,
      updatedAt: new Date().toISOString(),
    });

    console.log('Обновленная сущность:', response.data);
    return {
      id: response.data.data.id,
      name: response.data.data.title,
      description: response.data.data.content,
      createdAt: response.data.data.createdAt,
      updatedAt: response.data.data.updatedAt,
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