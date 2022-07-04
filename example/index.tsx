import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactPanZoom, { PanViewer } from '../.';

const App = () => {
  return (
    <div>
      <ReactPanZoom
        image="https://images.unsplash.com/photo-1551091708-fda32ed3178c"
        alt="Image alt text"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
