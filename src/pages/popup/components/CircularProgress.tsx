/**
 * Defines the properties for the CircularProgress component.
 * 
 * @property {number} percentage - The percentage value to display in the progress circle.
 * @property {number} [size=120] - The size of the progress circle in pixels.
 * @property {number} [strokeWidth=8] - The width of the progress circle's stroke in pixels.
 * @property {string} [color="var(--primary-color)"] - The color of the progress circle.
 * @property {string} [label="Usage progress"] - The label to display for the progress circle.
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
 * @param props - Component properties
 */
export const CircularProgress = (props: CircularProgressProps) => {
  const size = props.size || 120
  const strokeWidth = props.strokeWidth || 8
  const color = props.color || "var(--primary-color)"
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const dash = (props.percentage * circumference) / 100

  return (
    <div
      class="circular-progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.percentage}
      role="progressbar"
      aria-label={props.label || "Usage progress"}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle class="progress-bg" cx={size / 2} cy={size / 2} r={radius} stroke-width={strokeWidth} />
        <circle
          class="progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke-width={strokeWidth}
          stroke-dasharray={`${circumference}`}
          stroke-dashoffset={`${circumference - dash}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ stroke: color }}
        />
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" class="progress-text">
          {props.percentage}%
        </text>
      </svg>
    </div>
  )
}