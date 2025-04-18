import { createMemo } from "solid-js"

/**
 * Defines the properties for the CircularProgress component.
 */
export type CircularProgressProps = {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

/**
 * CircularProgress component that displays a circular progress indicator
 */
export const CircularProgress = (props: CircularProgressProps) => {
  const size = () => props.size || 120
  const strokeWidth = () => props.strokeWidth || 8
  const color = () => props.color || "var(--primary-color)"
  const percentage = () => props.percentage;

  const radius = createMemo(()=> (size() - strokeWidth()) / 2);
  const circumference = createMemo(() => radius() * 2 * Math.PI);
  const dash = createMemo(() => (percentage() * circumference()) / 100);

  return (
    <div
      class="circular-progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage()}
      role="progressbar"
      aria-label={props.label || "Usage progress"}
    >
      <svg width={size()} height={size()} viewBox={`0 0 ${size} ${size}`}>
        <circle class="progress-bg" cx={size() / 2} cy={size() / 2} r={radius()} stroke-width={strokeWidth()} />
        <circle
          class="progress-fill"
          cx={size() / 2}
          cy={size() / 2}
          r={radius()}
          stroke-width={strokeWidth()}
          stroke-dasharray={`${circumference()}`}
          stroke-dashoffset={`${circumference() - dash()}`}
          transform={`rotate(-90 ${size() / 2} ${size() / 2})`}
          style={{ stroke: color() }}
        />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="progress-text">
          {percentage()}%
        </text>
      </svg>
    </div>
  )
}