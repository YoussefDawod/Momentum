import { useState } from "react";
import Toggle from "./Toggle";

export default {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

const Template = (args) => {
  const [checked, setChecked] = useState(args.checked ?? false);
  return (
    <div style={{ width: 360 }}>
      <Toggle {...args} checked={checked} onChange={setChecked} />
    </div>
  );
};

export const Default = {
  render: Template,
  args: { id: "t1", label: "Benachrichtigungen", description: "Ton beim Phasenwechsel" },
};

export const Checked = {
  render: Template,
  args: { id: "t2", label: "Dark Mode", checked: true },
};

export const Disabled = {
  render: Template,
  args: { id: "t3", label: "Auto-Start", description: "Nicht verfügbar", disabled: true },
};
