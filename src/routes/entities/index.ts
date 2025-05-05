import { createFileRoute } from "@tanstack/react-router" ;
import Entities from "../../pages/Entities";

export const Route = createFileRoute('/entities/')({
    component: Entities,
});