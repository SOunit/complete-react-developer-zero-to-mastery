import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    // local state
    this.state = {
      monsters: [],
      searchField: "",
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
        // console.log(user);
        this.setState(
          () => {
            return { monsters: user };
          },
          () => {
            // console.log(this.state);
          }
        );
      });
  }

  // optimization
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      () => {
        return { searchField };
      },
      () => {
        // console.log(this.state);
      }
    );
  };

  render() {
    console.info(2, "render");

    // optimization
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(searchField)
    );

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder={"search monsters"}
          className={"monsters-search-box"}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
