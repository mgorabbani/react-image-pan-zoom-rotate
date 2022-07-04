# React Image Pan, Zoom & Rotate

> React library to give control on image to move zoom and rotate

[![NPM](https://img.shields.io/npm/v/react-image-pan-zoom-rotate.svg)](https://www.npmjs.com/package/react-image-pan-zoom-rotate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![npm type definitions](https://img.shields.io/npm/types/typescript.svg?label=lang)

## Demo

![image](https://user-images.githubusercontent.com/12911638/129459723-3797ebbe-76eb-465b-bf38-5c61212fca83.png)

[![Edit q8wl1joow9](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/n1rv671pkj)

## Features

- Drag & Move
- Zoom In
- Zoom Out
- Rotate (in Left only)
- Flip Image
- Reset

## Install

```bash
npm install --save react-image-pan-zoom-rotate
```

or

```
> yarn add react-image-pan-zoom-rotate
```

## Usage

```tsx
import React from 'react';
import ReactPanZoom from 'react-image-pan-zoom-rotate';

const App = () => {
  return (
    <ReactPanZoom
      image="https://images.unsplash.com/photo-1551091708-fda32ed3178c"
      alt="Image alt text"
    />
  );
};

export default App;
```

or Check example folder below file to use your custom UI

```
ReactPanZoom.tsx
```

## License

MIT © [mgorabbani](https://github.com/mgorabbani)
