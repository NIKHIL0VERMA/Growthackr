export function RadialProgressBar({ value, max, label }) {
    const percentage = (value / max) * 100
    const strokeDasharray = `${percentage}, 100`
  
    return (
      <svg class="radial-progress" width="60" height="60" viewBox="0 0 100 100">
        <circle class="progress-bg" cx="50" cy="50" r="45" />
        <circle
          class="progress-bar"
          cx="50"
          cy="50"
          r="45"
          style={{ "stroke-dasharray": strokeDasharray }}
        />
        <text x="50" y="50" text-anchor="middle" dy=".3em" class="progress-label">
          {label}
        </text>
      </svg>
    )
  }