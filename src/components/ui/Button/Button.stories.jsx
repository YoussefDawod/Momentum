import { Play, Pause, RotateCcw } from "lucide-react";
import Button from "./Button";

export default {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    iconPosition: { control: "radio", options: ["left", "right"] },
  },
};

export const Primary = { args: { variant: "primary", children: "Los geht's" } };
export const Secondary = { args: { variant: "secondary", children: "Zurücksetzen" } };
export const Ghost = { args: { variant: "ghost", children: "Abbrechen" } };
export const Danger = { args: { variant: "danger", children: "Löschen" } };

export const WithIconLeft = {
  args: { variant: "primary", icon: Play, children: "Starten" },
};
export const WithIconRight = {
  args: { variant: "secondary", icon: RotateCcw, iconPosition: "right", children: "Reset" },
};
export const IconOnly = {
  args: { variant: "ghost", icon: Pause, "aria-label": "Pause" },
};
export const Small = { args: { size: "sm", children: "Klein" } };
export const Large = { args: { size: "lg", children: "Groß" } };
export const Disabled = { args: { children: "Deaktiviert", disabled: true } };
