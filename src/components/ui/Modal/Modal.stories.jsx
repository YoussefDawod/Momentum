import { useState } from "react";
import Modal from "./Modal";
import Button from "../Button/Button";

export default {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

const Template = (args) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 40, minHeight: "60vh" }}>
      <Button onClick={() => setOpen(true)}>Modal öffnen</Button>
      <Modal {...args} isOpen={open} onClose={() => setOpen(false)}>
        <p>Dies ist der Inhalt des Modals.</p>
        <p>Schließen via ESC, Backdrop-Klick oder X-Button.</p>
      </Modal>
    </div>
  );
};

export const Small = { render: Template, args: { title: "Klein", size: "sm" } };
export const Medium = { render: Template, args: { title: "Standard", size: "md" } };
export const Large = { render: Template, args: { title: "Groß", size: "lg" } };
