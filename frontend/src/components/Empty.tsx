import { Inbox } from "lucide-react";
import { H1 } from "./ui/typography";
interface EmptyProps {
    title: string
    className?:string
}
export default function Empty({ title, className }: EmptyProps) {
    return (
        <div className={`h-full text-center text-action-text-color rounded-2xl bg-card-bg shadow-lg flex items-center justify-center py-22 ${className}`}>
            <div>
                <Inbox className="h-20 w-20 m-auto text-tag-stroke-color" />
                <H1 className="mt-6">{title}</H1>
            </div>
        </div>
    )
}