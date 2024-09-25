import { useContext, createMemo, JSX } from 'solid-js'
import Context from './context'
import { getCirclePath } from './utils'

interface BackgroundProps extends JSX.UseSVGAttributes<SVGPathElement> {
  angle?: number
  color?: string
  opacity?: number
}

export default function Background({
  angle = 360,
  color = 'black',
  opacity = 0.5,
  ...rest
}: BackgroundProps) {

  const { rotation, radius } = useContext(Context)
  const backgroundStart = rotation + angle / 2

  const backgroundPath = createMemo(() => getCirclePath(
    radius,
    radius,
    radius,
    -backgroundStart,
    -backgroundStart + angle
  ), [radius, backgroundStart, angle])

  return (
    <path
      d={backgroundPath()}
      fill={color}
      fill-opacity={opacity}
      {...rest}
    />
  )
}