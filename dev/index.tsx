import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PanViewer from '../src/PanViewer';

ReactDOM.render(
  <PanViewer image="https://drscdn.500px.org/photo/105738331/q%3D80_m%3D2000/v2?webp=true&sig=538a4f76f4966c84acb01426bb4a4a5e4a85b72a2c3bd64973d3a369f9653007" />,
  document.getElementById('app-pan-and-zoom'),
);
