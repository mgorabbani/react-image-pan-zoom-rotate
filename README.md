![npm type definitions](https://img.shields.io/npm/types/typescript.svg?label=lang)
# React Pan, Zoom & Rotate

A simple pan and zoom and rotating for images in react.

## Demo
![](https://media.giphy.com/media/WVGLHnLLSREM6lqmWe/source.gif)

[![Edit q8wl1joow9](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n1rv671pkj)

## Installation

```
> yarn add react-image-pan-zoom-rotate
```

## Features
- Drag & Move
- Zoom In 
- Zoom Out
- Rotate (in Left only) 


## Usage

```typescript
import ReactPanZoom from 'react-image-pan-zoom-rotate';
class MyComponent extends React.PureComponent {
  public render() {
    return (
      <ReactPanZoom image="https://drscdn.500px.org/photo/105738331/q%3D80_m%3D2000/v2?webp=true&sig=538a4f76f4966c84acb01426bb4a4a5e4a85b72a2c3bd64973d3a369f9653007" alt="document image"/>
    );
  }
}
```
