import React from "react";
import { cn } from "@/lib/utils";

type SectionProps<T extends React.ElementType = "section"> = {
    children: React.ReactNode;
    className?: string;
    as?: T; // Dynamic HTML tag
    padding?: string;
    bg?: string;
    rounded?: string;
    fullWidth?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as">;

const Section = <T extends React.ElementType = "section">({
    children,
    className,
    as,
    padding = "py-[40px] px-[14px] text-center md:py-[112px] md:px-[80px]",
    bg = "bg-white",
    rounded = "rounded-xl",
    fullWidth = true,
    ...props
}: SectionProps<T>) => {
    const Component = as || "section";

    return (
        <Component
            className={cn(
                fullWidth ? "w-full" : "max-w-7xl mx-auto",
                padding,
                bg,
                rounded,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Section;
