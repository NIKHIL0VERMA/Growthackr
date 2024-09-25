import { JSX, useContext, createMemo } from 'solid-js'
import Context from './context'
import { getCirclePath } from './utils'

interface ArcProps extends JSX.UseSVGAttributes<SVGPathElement> {
  color?: string
  opacity?: number
  arcWidth?: number
  lineCap?: JSX.UseSVGAttributes<SVGPathElement>['stroke-linecap']
}

export default function Arc({
  color = 'black',
  opacity = 0.3,
  arcWidth = 4,
  lineCap,
  ...rest
}: ArcProps) {

  const {
    radius,
    lineCap: globalLineCap,
    angle,
  } = useContext(Context)

  const secondaryPath = createMemo(() => getCirclePath(
    radius,
    radius,
    radius - arcWidth / 2,
    0,
    angle
  ), [radius, arcWidth, angle])

  return (
    <path
      d={secondaryPath()}
      stroke={color}
      stroke-opacity={opacity}
      stroke-width={arcWidth}
      stroke-linecap={lineCap || globalLineCap}
      fill='transparent'
      {...rest}
    />
  )
}