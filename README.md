# React Pan & Zoom

A simple pan and zoom for canvas like elements in react.

## Demo
[![Edit q8wl1joow9](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/q8wl1joow9)

## Installation

```
> yarn add @ajainarayanan/react-pan-zoom
```

## Usage

```typescript
import ReactPanZoom from "@ajainarayanan/react-pan-zoom";
class MyComponent extends React.PureComponent {

  public render() {
    return (
      <ReactPanZoom>
        <img src="some/src/for/image.png" />
      </ReactPanZoom>
    );
  }
}
```

## Props

- `zoom` : Provide zoom level for the cavnas'ish element. `1` by default
- `dx` : Provide the initial x co-ordinate to pan the underlying element to be. `0` by default
- `dy` : Provide the initial y co-ordinate to pan the underlying element to be. `0` by default

For more information on what `dx` and `dy` mean please [refer here](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix)
`(tx == dx and ty == dy)`.

