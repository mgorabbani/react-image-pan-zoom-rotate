import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';
import ReactPanZoom from '../src/react-pan-zoom-rotate';

describe('Unit Tests for ReactPanAndZoom', () => {
  let textContent;
  let panzoom1;
  let panzoomNode;
  beforeEach(() => {
    textContent = 'Title To Zoom';
    panzoom1 = TestUtils.renderIntoDocument(
      <ReactPanZoom>
        <h1> {textContent} </h1>
      </ReactPanZoom>,
    ) as React.PureComponent<any>;
    panzoomNode = ReactDOM.findDOMNode(panzoom1);
  });

  it('Should render with the given children', () => {
    expect(panzoomNode.textContent.replace(/ /g, '')).toEqual(
      textContent.replace(/ /g, ''),
    );
  });

  it('Should have a valid matrix property', () => {
    const matrixContainer = (panzoomNode as HTMLElement).querySelector('div');
    expect(matrixContainer.style.transform).toEqual('matrix(0,0,0,0,0,0)');
  });

  it('Should have a valid zoom that is being passed in', () => {
    panzoom1 = TestUtils.renderIntoDocument(
      <ReactPanZoom zoom={2}>
        <h1> {textContent} </h1>
      </ReactPanZoom>,
    ) as React.PureComponent<any>;
    panzoomNode = ReactDOM.findDOMNode(panzoom1);
    const matrixContainer = (panzoomNode as HTMLElement).querySelector('div');
    expect(matrixContainer.style.transform).toEqual('matrix(2,0,0,2,0,0)');
  });

  it('Should have a valid pandx that is being passed in', () => {
    panzoom1 = TestUtils.renderIntoDocument(
      <ReactPanZoom zoom={2} pandx={100}>
        <h1> {textContent} </h1>
      </ReactPanZoom>,
    ) as React.PureComponent<any>;
    panzoomNode = ReactDOM.findDOMNode(panzoom1);
    const matrixContainer = (panzoomNode as HTMLElement).querySelector('div');
    expect(matrixContainer.style.transform).toEqual('matrix(2,0,0,2,100,0)');
  });

  it('Should have a valid pandx that is being passed in', () => {
    panzoom1 = TestUtils.renderIntoDocument(
      <ReactPanZoom zoom={2} pandy={100}>
        <h1> {textContent} </h1>
      </ReactPanZoom>,
    ) as React.PureComponent<any>;
    panzoomNode = ReactDOM.findDOMNode(panzoom1);
    const matrixContainer = (panzoomNode as HTMLElement).querySelector('div');
    expect(matrixContainer.style.transform).toEqual('matrix(2,0,0,2,0,100)');
  });
});
