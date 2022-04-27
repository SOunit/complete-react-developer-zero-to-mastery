import { Component } from "react";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: { firstName: "Jack", lastName: "Pearson" },
      company: "Big 3 Company",
    };
  }

  clickHandler() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hi {this.state.name.firstName} {this.state.name.lastName}, works at{" "}
            {this.state.company}
          </p>
          <button
            onClick={() => {
              // this.setState({
              //   name: { firstName: "Jack2", lastName: "Pearson" },
              // });
              this.setState(
                (_state, _props) => {
                  return {
                    name: { firstName: "Jack2", lastName: "Pearson" },
                  };
                },
                () => {
                  // callback function runs after state update
                  console.log(this.state);
                }
              );
            }}
          >
            Change Name
          </button>
        </header>
      </div>
    );
  }
}

export default App;
