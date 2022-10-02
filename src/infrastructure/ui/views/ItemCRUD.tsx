import { useRoute } from "wouter";
import { Transition } from "react-transition-group";

export function ItemCRUD() {
  const [match, params] = useRoute("/items/:id");

  return (
    <Transition in={match} timeout={500}>
      <div>Hi, this is: {params!.id}</div>
    </Transition>
  );
}
