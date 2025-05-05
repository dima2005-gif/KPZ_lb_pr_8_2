import { createFileRoute } from "@tanstack/react-router";
import EntityCreate from "../../pages/EntityCreate.tsx";

export const Route = createFileRoute('/entities/new')({
  component: EntityCreate,
});