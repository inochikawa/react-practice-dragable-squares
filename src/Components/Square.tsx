import React from 'react';
import "./../styles/square.css";

export class SquareModel {
    constructor(
        public id: number,
        public x: number,
        public y: number,
        public width: number,
        public isActive: boolean
    ) {
    }
}

interface ISquareState {
    x: number;
    y: number;
}

interface ISquareProps {
    model: SquareModel;
    onClick?: () => void;
    onOutsideClick?: () => void;
}

export class Square extends React.Component<ISquareProps, ISquareState> {
    private _isDrag: boolean = false;
    private _squareHtml: HTMLDivElement | null = null;

    constructor(props: ISquareProps) {
        super(props);
        this.state = {
            x: props.model.x || 0,
            y: props.model.y || 0
        };

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        window.document.addEventListener("mousemove", this.onMouseOver);
        window.document.addEventListener("mousedown", this.onMouseDown);
        window.document.addEventListener("mouseup", this.onMouseUp);
        window.document.addEventListener("keydown", this.onKeyDown);
    }

    componentWillUnmount() {

        window.document.removeEventListener("mousemove", this.onMouseOver);
        window.document.removeEventListener("mousedown", this.onMouseDown);
        window.document.removeEventListener("mouseup", this.onMouseUp);
        window.document.removeEventListener("keydown", this.onKeyDown);
    }

    render() {
        const { onClick, model } = this.props;
        const { x, y } = this.state;

        let width = model.width;
        let height = model.width;

        if (model.isActive) {
            width = width * 1.1;
            height = height * 1.1;
        }

        return (
            <div
                ref={(refItem) => this._squareHtml = refItem}
                style={{
                    top: y,
                    left: x,
                    pointerEvents: model.isActive ? "none" : "all",
                    opacity: model.isActive ? 1 : 0.5,
                    width: width,
                    height: height
                }} className="square"
                onClick={() => {
                    if (onClick) {
                        onClick();
                    }
                }}
            >
                HUI {model.isActive ? "PEZDA" : ""}
            </div>
        );
    }

    private onMouseOver(event: MouseEvent) {
        if (this._isDrag) {
            this.dragMe(event);
        }
    }

    private onMouseDown(event: MouseEvent) {
        const htmlElement: HTMLElement | null = event.target as HTMLElement;

        if (htmlElement && htmlElement.className !== "square") {
            this._isDrag = true;
            this.dragMe(event);
        }
    }


    private onMouseUp(event: MouseEvent) {
        this._isDrag = false;
    }

    private onKeyDown(event: KeyboardEvent) {
        const { onOutsideClick } = this.props;
        if (event.keyCode === 13 && onOutsideClick) {
            onOutsideClick();
        }
    }

    private dragMe(event: MouseEvent) {
        if (this.props.model.isActive) {
            const mousePositionX = event.clientX;
            const mousePositionY = event.clientY;

            if (this._squareHtml) {
                const width = this._squareHtml.clientWidth;
                const height = this._squareHtml.clientHeight;

                this.setState({
                    x: mousePositionX - width / 2,
                    y: mousePositionY - height / 2
                });
            }
        }
    }
}