import { useRoute } from "wouter";
import { Transition } from "react-transition-group";
import { useStore } from "../store";
import { ChangeEventHandler, useEffect, useState } from "react";

export function SettingsCRUD() {
  const [match] = useRoute("/settings");
  const { settings, useCases } = useStore();
  const [syncUrl, setSyncUrl] = useState(settings.syncUrl || "");
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setSyncUrl(value);
  };

  useEffect(() => {
    useCases.getSettings();
  }, [useCases]);

  useEffect(() => {
    useCases.setSettings({ syncUrl });
  }, [syncUrl]);

  return (
    <Transition in={match} timeout={500}>
      <input type="text" defaultValue={syncUrl} onChange={onChangeHandler} />
    </Transition>
  );
}
