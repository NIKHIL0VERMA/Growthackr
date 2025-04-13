import type { JSX } from "solid-js"
import "@styles/buttons.css"

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
}

export function Button(props: ButtonProps) {
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
  }

  return (
    <button {...props} class={`${variantClasses[props.variant || "primary"]} ${props.class || ""}`} />
  )
}

