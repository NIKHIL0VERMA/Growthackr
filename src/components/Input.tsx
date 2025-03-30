import type { JSX } from "solid-js"
import "@assets/styles/input.css"

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input(props: InputProps) {
  return (
    <div class="input-container">
      {props.label && (
        <label 
          for={props.id} 
          class="input-label"
          aria-label={props.label}
        >
          {props.label}
        </label>
      )}
      <input
        {...props}
        class={`input-field ${props.class || ""}`}
        aria-required={props.required}
        aria-invalid={props['aria-invalid'] || false}
      />
    </div>
  )
}

