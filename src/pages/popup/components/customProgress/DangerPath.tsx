import { SVGAttributes, useContext, useMemo } from 'react'
import Context from './context'
import { getCirclePath } from './utils'

interface DangerPathProps extends SVGAttributes<SVGPathElement> {
  color?: string
  angle?: number
  arcWidth?: number
  lineCap?: SVGAttributes<SVGPathElement>['strokeLinecap']
  offset?: number
}

export default function DangerPath({
  color = '#FF3333',
  angle = 50,
  arcWidth = 4,
  lineCap,
  offset = 6,
  ...rest
}: DangerPathProps) {

  const {
    radius,
    angle: globalAngle,
    lineCap: globalLineCap,
  } = useContext(Context)

  const circlePath = useMemo(() => getCirclePath(
    radius,
    radius,
    radius - arcWidth - offset,
    globalAngle - angle,
    globalAngle,
  ), [radius, globalAngle, angle, arcWidth, offset])

  return (
    <path
      d={circlePath}
      stroke={color}
      strokeWidth={arcWidth}
      strokeLinecap={lineCap || globalLineCap}
      fill="transparent"
      {...rest}
    />
  )
}