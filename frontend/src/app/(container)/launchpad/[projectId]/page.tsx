import Body from "./Body";

export default async function SingleIDO({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <Body id={projectId} />;
}