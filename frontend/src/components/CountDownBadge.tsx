'use client'
import { useCountdown } from "@/components/Countdown";
import { Badge } from "./ui/badge";
interface CountdownBadgeProps {
    settle_starts_at: BigInt | undefined;
    settle_duration: BigInt;
}

export default function CountDownBadge({ settle_starts_at, settle_duration }: CountdownBadgeProps) {
    const { status, timeLeft } = useCountdown(
        Number(settle_starts_at),
        Number(settle_duration)
    );

    return (
        <>
            {status === "Running" ? (
                <Badge variant="info" className='w-20'>{timeLeft}</Badge>
            ) : status === "Not Started" ? (
                <Badge variant="input" className='w-20'>Not Started</Badge>
            ) : (
                <Badge variant="warning" className='w-20'>Ended</Badge>
            )}
        </>
    );
}
