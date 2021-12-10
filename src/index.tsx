import * as React from 'react'
import ReactPanZoom from './react-pan-zoom-rotate'

// box-shadow: 0px 0px 5px 1px #0c0c0c;

type PanViewerProps = {
  image: string
  alt?: string
  ref?: any
}

const PanViewer = ({ image, alt, ref }: PanViewerProps) => {
  const [dx, setDx] = React.useState(0)
  const [dy, setDy] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)

  const resetAll = () => {
    setDx(0)
    setDy(0)
    setZoom(1)
  }
  const zoomIn = () => {
    setZoom(zoom + 0.2)
  }

  const zoomOut = () => {
    if (zoom >= 1) {
      setZoom(zoom - 0.2)
    }
  }

  const onPan = (dx: number, dy: number) => {
    setDx(dx)
    setDy(dy)
  }

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          right: '10px',
          zIndex: 2,
          top: 10,
          userSelect: 'none',
          borderRadius: 2,
          background: '#fff',
          boxShadow: '0px 2px 6px rgba(53, 67, 93, 0.32)'
        }}
      >
        <div
          onClick={zoomIn}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            height: 40,
            width: 40,
            borderBottom: ' 1px solid #ccc'
          }}
        >
          <svg
            style={{
              height: '100%',
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 12H20'
              stroke='#4C68C1'
              strokeWidth='2'
              strokeLinecap='round'
            />
            <path
              d='M12 4L12 20'
              stroke='#4C68C1'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
        <div
          onClick={zoomOut}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            height: 40,
            width: 40,
            borderBottom: ' 1px solid #ccc'
          }}
        >
          <svg
            style={{
              height: '100%',
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 12H20'
              stroke='#4C68C1'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </div>
        <div
          onClick={resetAll}
          style={{
            textAlign: 'center',
            cursor: 'pointer',
            height: 40,
            width: 40
          }}
        >
          <svg
            style={{
              height: '100%',
              width: '100%',
              padding: 10,
              boxSizing: 'border-box'
            }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            stroke='#4C68C1'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7' />
          </svg>
        </div>
      </div>
      <ReactPanZoom
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1
        }}
        zoom={zoom}
        setZoom={setZoom}
        pandx={dx}
        pandy={dy}
        onPan={onPan}
        key={dx}
      >
        <img
          style={{
            width: '100%',
            position: 'absolute',
            top: '0',
          }}
          src={image}
          alt={alt}
          ref={ref}
        />
      </ReactPanZoom>
    </div>
  )
}

export default PanViewer
