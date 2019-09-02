import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Square, SquareModel } from './Components/Square';

interface IAppState {
  squares: SquareModel[];
}

interface IAppProps { }

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      squares: [
        new SquareModel(1, 10, 10, 100, false),
        new SquareModel(2, 50, 200, 150, false),
        new SquareModel(3, 190, 270, 200, false),
      ]
    };
  }

  render() {
    const { squares } = this.state;
    return (
      <div className="App">
        <div>
          <button onClick={() => this.onAdd()}> Add square</button>
          <button onClick={() => this.onRemove()}> Remove last square </button>
          {
            squares.map((i, index) => (<Square onOutsideClick={() => this.unselectAll()} onClick={() => this.onSquareClick(i.id)} key={`${index}`} model={i} />))
          }
        </div>
      </div>
    );
  }

  private onSquareClick(id: number) {
    this.setState({
      squares: this.state.squares.map((i) => {
        if (i.id === id) {
          i.isActive = true;
        } else {
          i.isActive = false;
        }
        return i;
      })
    });
  }

  private onAdd() {
    const maxId = Math.max(...this.state.squares.map(i => i.id)) || 1;

    this.setState({
      squares: [
        ...this.state.squares,
        new SquareModel(maxId + 1, 10, 10, 100, false)
      ]
    });
  }

  private onRemove() {
    const arr = [...this.state.squares];
    const item = arr.pop();

    this.setState({
      squares: arr
    });
  }

  private unselectAll() {
    this.setState({
      squares: this.state.squares.map(i => {
        i.isActive = false;
        return i;
      })
    });
  }
}

export default App;
