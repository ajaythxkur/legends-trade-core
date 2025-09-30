import Body from "./Body";

export default async function PremarketTokenPage({ params }: { params: Promise<{ tokenid: string }> }) {
  const { tokenid } = await params;

  return <Body tokenAddr={tokenid} />;
}
