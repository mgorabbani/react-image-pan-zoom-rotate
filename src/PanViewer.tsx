import * as React from 'react';

export interface IDragData {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface IReactPanZoomStateType {
  dragging: boolean;
  mouseDown: boolean;
  comesFromDragging: boolean;
  dragData: IDragData;
  matrixData: number[];
}
export interface IReactPanZoomProps {
  height?: string;
  width?: string;
  className?: string;
  enablePan?: boolean;
  reset?: () => void;
  zoom?: number;
  pandx?: number;
  pandy?: number;
  rotation?: number;
  onPan?: (x: number, y: number) => void;
  setZoom: (z: number) => void;
  onReset?: (dx: number, dy: number, zoom: number) => void;
  onClick?: (e: React.MouseEvent<any>) => void;
  style?: {};
  children?: React.ReactNode;
}
export default class ReactPanZoom extends React.PureComponent<
  IReactPanZoomProps
> {
  // In strict null checking setting default props doesn't seem to work. Hence the non-null assertion.
  // :crossedfingers: it shouldn't be deprecated. Or the very least support defaultProps semantics as proposed
  // in this PR: https://github.com/Microsoft/TypeScript/issues/23812
  public static defaultProps: Partial<IReactPanZoomProps> = {
    enablePan: true,
    onPan: () => undefined,
    onReset: () => undefined,
    pandx: 0,
    pandy: 0,
    zoom: 0,
    rotation: 0,
  };

  private panWrapper: any;

  private panContainer: any;
  private getInitialState = (): IReactPanZoomStateType => {
    const { pandx, pandy, zoom } = this.props;
    const defaultDragData = {
      dx: pandx!,
      dy: pandy!,
      x: 0,
      y: 0,
    };
    return {
      comesFromDragging: false,
      dragData: defaultDragData,
      dragging: false,
      matrixData: [
        zoom!,
        0,
        0,
        zoom!,
        pandx!,
        pandy!, // [zoom, skew, skew, zoom, dx, dy]
      ],
      mouseDown: false,
    };
  };

  public state = this.getInitialState();

  public UNSAFE_componentWillReceiveProps(nextProps: IReactPanZoomProps) {
    const { matrixData } = this.state;
    if (matrixData[0] !== nextProps.zoom) {
      const newMatrixData = [...this.state.matrixData];
      newMatrixData[0] = nextProps.zoom || newMatrixData[0];
      newMatrixData[3] = nextProps.zoom || newMatrixData[3];
      this.setState({
        matrixData: newMatrixData,
      });
    }
  }

  public reset = () => {
    const matrixData = [0.4, 0, 0, 0.4, 0, 0];
    this.setState({ matrixData });
    if (this.props.onReset) {
      this.props.onReset(0, 0, 1);
    }
  };

  // tslint:disable-next-line: member-ordering
  public onClick = (e: React.MouseEvent<EventTarget>) => {
    if (this.state.comesFromDragging) {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
  };

  // tslint:disable-next-line: member-ordering
  public onTouchStart = (e: React.TouchEvent<EventTarget>) => {
    const { pageX, pageY } = e.touches[0];
    this.panStart(pageX, pageY, e);
  };

  // tslint:disable-next-line: member-ordering
  public onTouchEnd = () => {
    this.onMouseUp();
  };

  // tslint:disable-next-line: member-ordering
  public onTouchMove = (e: React.TouchEvent<EventTarget>) => {
    this.updateMousePosition(e.touches[0].pageX, e.touches[0].pageY);
  };

  // tslint:disable-next-line: member-ordering
  public render() {
    return (
      <div
        className={`pan-container ${this.props.className || ''}`}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onMouseMove={this.onMouseMove}
        onWheel={this.onWheel}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
        style={{
          height: this.props.height,
          userSelect: 'none',
          width: this.props.width,
        }}
        ref={(ref) => (this.panWrapper = ref)}
      >
        <div
          ref={(ref) => (ref ? (this.panContainer = ref) : null)}
          style={{
            transform: `matrix(${this.state.matrixData.toString()})`,
          }}
        >
          {this.props.children}
        </div>
      </div>
    );
  }

  private onMouseDown = (e: React.MouseEvent<EventTarget>) => {
    this.panStart(e.pageX, e.pageY, e);
  };

  private panStart = (
    pageX: number,
    pageY: number,
    event: React.MouseEvent<EventTarget> | React.TouchEvent<EventTarget>
  ) => {
    if (!this.props.enablePan) {
      return;
    }

    const { matrixData } = this.state;
    const offsetX = matrixData[4];
    const offsetY = matrixData[5];
    const newDragData: IDragData = {
      dx: offsetX,
      dy: offsetY,
      x: pageX,
      y: pageY,
    };
    this.setState({
      dragData: newDragData,
      mouseDown: true,
    });
    if (this.panWrapper) {
      this.panWrapper.style.cursor = 'move';
    }
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  private onMouseUp = () => {
    this.panEnd();
  };

  private panEnd = () => {
    this.setState({
      comesFromDragging: this.state.dragging,
      dragging: false,
      mouseDown: false,
    });
    if (this.panWrapper) {
      this.panWrapper.style.cursor = '';
    }
    if (this.props.onPan) {
      this.props.onPan(this.state.matrixData[4], this.state.matrixData[5]);
    }
  };

  public preventDefault(e: any) {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  }

  private onMouseMove = (e: React.MouseEvent<EventTarget>) => {
    this.updateMousePosition(e.pageX, e.pageY);
  };

  private onWheel = (e: React.WheelEvent<EventTarget>) => {
    Math.sign(e.deltaY) < 0
      ? this.props.setZoom((this.props.zoom || 0) + 0.1)
      : (this.props.zoom || 0) > 1 &&
        this.props.setZoom((this.props.zoom || 0) - 0.1);
  };

  private onMouseEnter = () => {
    document.addEventListener('wheel', this.preventDefault, {
      passive: false,
    });
  };

  private onMouseLeave = () => {
    document.removeEventListener('wheel', this.preventDefault, false);
  };

  private updateMousePosition = (pageX: number, pageY: number) => {
    if (!this.state.mouseDown) return;

    const matrixData = this.getNewMatrixData(pageX, pageY);
    this.setState({
      dragging: true,
      matrixData,
    });
    if (this.panContainer) {
      this.panContainer.style.transform = `matrix(${this.state.matrixData.toString()})`;
    }
  };

  private getNewMatrixData = (x: number, y: number): number[] => {
    const { dragData, matrixData } = this.state;
    const deltaX = dragData.x - x;
    const deltaY = dragData.y - y;
    matrixData[4] = dragData.dx - deltaX;
    matrixData[5] = dragData.dy - deltaY;
    return matrixData;
  };
}
