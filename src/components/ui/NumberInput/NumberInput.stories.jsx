import { useState } from "react";
import NumberInput from "./NumberInput";

export default {
  title: "UI/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

const Template = (args) => {
  const [val, setVal] = useState(args.value ?? 25);
  return (
    <div style={{ width: 320 }}>
      <NumberInput {...args} value={val} onChange={setVal} />
    </div>
  );
};

export const Default = {
  render: Template,
  args: { id: "n1", label: "Fokus-Dauer", suffix: "min", min: 1, max: 120, value: 25 },
};

export const Seconds = {
  render: Template,
  args: { id: "n2", label: "Pause", suffix: "s", min: 5, max: 900, step: 5, value: 300 },
};

export const Disabled = {
  render: Template,
  args: { id: "n3", label: "Läuft — nicht änderbar", suffix: "min", value: 25, disabled: true },
};
