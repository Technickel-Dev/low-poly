import { useEffect, useRef } from 'react'
import useHexagonStore from '../store/useHexagonStore'

const GeneratedSVG = () => {
  const { lineColor, backgroundColor, strokeWidth }  = useHexagonStore(state => state.controlData)
  const dataPath = useHexagonStore(state => state.dataPath)

  const path = useRef();

  useEffect(() => {    
    if(dataPath) {
      path.current.setAttribute('d', `M${dataPath}Z`);
    }
  }, [dataPath])

  return ( 
    <svg width="350" height="350" viewBox="0 0 350 350" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hexagon_pattern" width="52.290799" height="45.285135" patternUnits="userSpaceOnUse">
          <path transform="matrix(3.7795 0 0 3.7795 -198.38 231.25)" d="m69.782-45.208 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 6e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 5e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 6e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 5e-6 3.9939zm17.294-5.9908 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 6e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 5e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 6e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969m24.212 1.997 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 6e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 5e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 6e-6 3.9939zm-6.9176 0 3.4588-1.997v-3.9939l-3.4588-1.9969-3.4588 1.9969 5e-6 3.9939z" clipPath="url(#clipPath6435)" fill="none" stroke={lineColor} strokeWidth="1.3229"/>
        </pattern>
      </defs>

      <rect x="0" y="0" width="350" height="350" fill={backgroundColor} />
      <path ref={path} stroke={lineColor} strokeLinejoin="round" strokeWidth={strokeWidth} fill="url(#hexagon_pattern)" />
    </svg>
  );
}
 
export default GeneratedSVG;