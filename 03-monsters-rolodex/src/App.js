import { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    // local state
    this.state = {
      monsters: [],
    };

    console.log(1, "constructor");
  }

  componentDidMount() {
    console.log(3, "componentDidMount");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        console.log(user);
        this.setState(
          () => {
            return { monsters: user };
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }

  render() {
    console.log(2, "render");
    return (
      <div className="App">
        {this.state.monsters.map((monster) => (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
