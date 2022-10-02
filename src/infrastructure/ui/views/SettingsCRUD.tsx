import { useRoute } from "wouter";
import { Transition } from "react-transition-group";
import { useStore } from "../store";
import { FormEventHandler, useEffect } from "react";

export function SettingsCRUD() {
  const [match] = useRoute("/settings");
  const { settings, actions } = useStore();
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const syncUrl = formData.get("syncUrl")?.toString();
    if (syncUrl && syncUrl.length) {
      actions.setSettings({
        syncUrl,
      });
    }
  };

  useEffect(() => {
    actions.getSettings();
  }, [actions]);

  return (
    <Transition in={match} timeout={500}>
      <form onSubmit={onSubmitHandler}>
        <input name="syncUrl" type="text" defaultValue={settings.syncUrl} />
        <button type="submit">💾</button>
      </form>
    </Transition>
  );
}
