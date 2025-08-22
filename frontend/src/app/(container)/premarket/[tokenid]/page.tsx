import Body from "./Body";

export default async function PremarketTokenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <Body id={id} />;
}