import Body from "./Body";

export default async function singlepremarketdashboard({ params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    return <Body id={id} />;
}