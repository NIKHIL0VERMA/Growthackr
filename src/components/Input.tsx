import type { JSX } from "solid-js"

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input(props: InputProps) {
  return (
    <div class="mb-4">
      {props.label && (
        <label for={props.id} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {props.label}
        </label>
      )}
      <input
        {...props}
        class={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${props.class || ""}`}
      />
    </div>
  )
}

