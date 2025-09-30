import React from "react"
import type { ReactNode, HTMLAttributes, ElementType } from "react"

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "tagline" | "pxxl" | "pxl" | "plg" | "p"

type Weight = "medium" | "regular"

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant
  weight?: Weight
  as?: ElementType
  className?: string
  children: ReactNode
}

const styles: Record<Variant, Record<Weight, string>> = {
  // Headings
  h1: {
    medium: "text-[2.75rem] leading-[3rem] md:text-[4.5rem] md:leading-[5rem]",
    regular: "text-[2.75rem] leading-[3rem] md:text-[4.5rem] md:leading-[5rem] font-bold",
  },
  h2: {
    medium: "text-[2.375rem] leading-[2.875rem] md:text-[3.5rem] md:leading-[4.1875rem]",
    regular: "text-[2.375rem] leading-[2.875rem] md:text-[3.5rem] md:leading-[4.1875rem] font-normal",
  },
  h3: {
    medium: "text-[2.375rem] leading-[2.875rem] md:text-[2.75rem] md:leading-[3.3125rem]",
    regular: "text-[2.375rem] leading-[2.875rem] md:text-[2.75rem] md:leading-[3.3125rem] font-normal",
  },
  h4: {
    medium: "text-[1.5rem] leading-[1.8125rem] md:text-[2.375rem] md:leading-[2.875rem]",
    regular: "text-[1.5rem] leading-[1.8125rem] md:text-[2.375rem] md:leading-[2.875rem] font-normal",
  },
  h5: {
    medium: "text-[1.25rem] leading-[1.5rem] md:text-[1.875rem] md:leading-[2.25rem]",
    regular: "text-[1.25rem] leading-[1.5rem] md:text-[1.875rem] md:leading-[2.25rem] font-normal",
  },
  h6: {
    medium: "text-[1.125rem] leading-[1.375rem] md:text-[1rem] md:leading-[1rem]",
    regular: "text-[1.125rem] leading-[1.375rem] md:text-[1rem] md:leading-[1rem] font-normal",
  },

  // Tagline
  tagline: {
    medium: "text-[0.875rem] leading-[0.875rem] md:text-[1rem] md:leading-[1rem]",
    regular: "text-[0.875rem] leading-[0.875rem] md:text-[1rem] md:leading-[1rem] font-normal",
  },

  // Paragraphs
  pxxl: {
    medium: "text-[1.125rem] leading-[1.8125rem] md:text-[1.5rem] md:leading-[2.375rem]",
    regular: "text-[1.125rem] leading-[1.8125rem] md:text-[1.5rem] md:leading-[2.375rem] font-normal",
  },
  pxl: {
    medium: "text-[1rem] leading-[1.625rem] md:text-[1.25rem] md:leading-[2rem]",
    regular: "text-[1rem] leading-[1.625rem] md:text-[1.25rem] md:leading-[2rem] font-normal",
  },
  plg: {
    medium: "text-[0.875rem] leading-[1.4375rem] md:text-[1rem] md:leading-[1.625rem]",
    regular: "text-[0.875rem] leading-[1.4375rem] md:text-[1rem] md:leading-[1.625rem] font-normal",
  },
  p: {
    medium: "text-[0.75rem] leading-[1.1875rem] md:text-[0.875rem] md:leading-[1.4375rem]",
    regular: "text-[0.75rem] leading-[1.1875rem] md:text-[0.875rem] md:leading-[1.4375rem] font-normal",
  },
}

const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  weight = "medium",
  as: Component,
  className = "",
  children,
  ...props
}) => {
  const getDefaultTag = (variant: Variant): ElementType => {
    if (variant.startsWith("h")) return variant as ElementType
    if (variant === "tagline") return "span"
    return "p"
  }

  const Tag: ElementType = Component || getDefaultTag(variant)
  const styleClasses = styles[variant][weight]
  const baseWeight = weight === "medium" ? "font-medium" : ""

  return React.createElement(
    Tag,
    {
      className: `${styleClasses} ${baseWeight} ${className}`.trim(),
      ...props,
    },
    children,
  )
}

// Individual component exports for direct usage
export const H1: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h1" {...props} />
export const H2: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h2" {...props} />
export const H3: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h3" {...props} />
export const H4: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h4" {...props} />
export const H5: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h5" {...props} />
export const H6: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="h6" {...props} />
export const Tagline: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="tagline" {...props} />
export const PXXLarge: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="pxxl" {...props} />
export const PXLarge: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="pxl" {...props} />
export const PLarge: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="plg" {...props} />
export const PSmall: React.FC<Omit<TypographyProps, "variant">> = (props) => <Typography variant="p" {...props} />

export default Typography
