import { createFileRoute } from '@tanstack/react-router';
import EntityDetails from '../../pages/EntityDetails';
import { getEntityById } from '../../entities';

export const Route = createFileRoute('/entities/$id')({
  component: EntityDetails,
  loader: ({ params: { id } }) => {
    const entity = getEntityById(Number(id));
    if (!entity) {
      throw new Error(`Entity with ID ${id} not found`);
    }
    return entity;
  },
});