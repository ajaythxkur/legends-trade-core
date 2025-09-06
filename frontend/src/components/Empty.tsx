import { Inbox } from "lucide-react";
import { H1 } from "./ui/typography";
interface EmptyProps {
    title: string
}
export default function Empty({ title }: EmptyProps) {
    return (
        <div className="text-center text-action-text-color rounded-2xl bg-card-bg shadow-lg flex items-center justify-center py-22">
            <div>
                <Inbox className="h-20 w-20 m-auto text-tag-stroke-color" />
                <H1 className="mt-6">{title}</H1>
            </div>
        </div>
    )
}