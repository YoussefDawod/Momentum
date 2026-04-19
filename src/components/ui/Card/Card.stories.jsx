import Card, { CardHeader, CardTitle, CardSubtitle, CardBody } from "./Card";

export default {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};

export const Simple = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <CardBody>Einfache Karte mit Glas-Effekt</CardBody>
    </Card>
  ),
};

export const WithHeader = {
  render: () => (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>Fokus-Zeit</CardTitle>
        <CardSubtitle>Heute 1h 25min</CardSubtitle>
      </CardHeader>
      <CardBody>Du bist auf einem guten Weg — weiter so!</CardBody>
    </Card>
  ),
};
