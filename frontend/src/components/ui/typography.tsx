import React, { forwardRef, type ElementType, type HTMLAttributes } from "react";

// Utility function (you can replace this with your actual cn function)
const cn = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};

type TypographyElement = HTMLHeadingElement | HTMLParagraphElement  | HTMLLIElement;

type TypographyTag =
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p-lg"
    | "p"
    | "p-md"
    | "p-sm"
    | "p-xs"
    | "button"
    | "li";


interface TypographyProps extends HTMLAttributes<TypographyElement> {
    as?: TypographyTag;
}

const Typography = forwardRef<TypographyElement, TypographyProps>(
    ({ className, as = "h1", children, ...props }, ref) => {
        const Component = (["p-lg", "p", "p-md", "p-sm", "p-xs", "button"].includes(as)
            ? "p"
            : as) as ElementType;

        const variants = {

            // Responsive ----------------------
            h1: "text-[2rem] leading-[2.25rem] tracking-[-0.02em] md:text-[2.5rem] md:leading-[3.25rem] md:tracking-[-0.03em] font-medium", // 32px / 36px (default) → 40px / 52px (on md)
            h2: "text-[2.25rem] leading-[2.75rem] tracking-[-0.02em] font-medium", // 36/44px
            h3: "text-[2rem] leading-[2.5rem] tracking-[0] font-normal", // 32/40px

            h4: "text-[1rem] leading-[1.5rem] sm:text-[1.25rem] sm:leading-[1.75rem] md:text-[1.75rem] md:leading-[2.25rem] font-medium", //16/24px -- sm:20/28px -- md:28/36px
            h5: "text-[1.5rem] leading-[2rem] tracking-[-0.01em] font-medium", // 24/32px
            h6: "text-[1.125rem] leading-[1.5rem] tracking-[-0.01em] font-bold sm:text-[1.25rem] sm:leading-[1.75rem]",  // 18/24px --- 20/28px

            // -----
            "p-lg": "text-[0.875rem] leading-[1.25rem] tracking-[0.02em] sm:text-[1.125rem] sm:leading-[1.75rem]", // 14/20px -- 18/28px 
            "p": "text-[1rem] leading-[1.5rem] tracking-[0.02em]", // 16/24px
            "p-md": "text-[1rem]  leading-[1.5rem] tracking-[0.02em]", // 16/16px
            "p-sm": "text-[0.75rem] leading-[1rem] tracking-[0.02em] md:text-[0.875rem] md:leading-[1.25rem]", // 12/16px -- 14/20px
            "p-xs": "text-[0.75rem]  leading-[0.75rem] tracking-[0.02em]", // 12/12px

            // Buttons
            button: "text-[1rem] leading-[1rem] tracking-[0.02em] font-medium", // 16px / 16px
            li: "text-[1rem] leading-[1rem] tracking-[0.02em]", // 16px / 16px
        };

        return (
            <Component
                className={cn(variants[as], className)}
                ref={ref}
                {...props}
            >
                {children}
            </Component>
        );
    }
);
Typography.displayName = "Typography";

// Heading components
export const H1 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
    <Typography as="h1" ref={ref} {...props} />
));
H1.displayName = "H1";

export const H2 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
    <Typography as="h2" ref={ref} {...props} />
));
H2.displayName = "H2";

export const H3 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
    <Typography as="h3" ref={ref} {...props} />
));
H3.displayName = "H3";

export const H4 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
    <Typography as="h4" ref={ref} {...props} />
));
H4.displayName = "H4";

export const H5 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
    <Typography as="h5" ref={ref} {...props} />
));
H5.displayName = "H5";

export const H6 = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => (
    <Typography as="h6" ref={ref} {...props} />
));
H6.displayName = "H6";

// Paragraph components
export const PLarge = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
    <Typography as="p-lg" ref={ref} {...props} />
));
PLarge.displayName = "PLarge";

export const P = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
    <Typography as="p" ref={ref} {...props} />
));
P.displayName = "P";

export const PMedium = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
    <Typography as="p-md" ref={ref} {...props} />
));
PMedium.displayName = "PMedium";

export const PSmall = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
    <Typography as="p-sm" ref={ref} {...props} />
));
PSmall.displayName = "PSmall";

export const PExtraSmall = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
    <Typography as="p-xs" ref={ref} {...props} />
));
PExtraSmall.displayName = "PExtraSmall";


export const ButtonText = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
    <Typography as="button" ref={ref} {...props} />
));
ButtonText.displayName = "ButtonText";
// export const LI = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>((props, ref) => (
//     <Typography as="li" ref={ref} {...props} />
// ));
// ButtonText.displayName = "LI";
export const LI = forwardRef<HTMLLIElement, HTMLAttributes<HTMLLIElement>>((props, ref) => (
  <Typography as="li" ref={ref} {...props} />
));
LI.displayName = "LI";

export { Typography };