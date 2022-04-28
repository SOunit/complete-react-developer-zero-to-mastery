const Person = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.occupation),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { class: "title" }, "React IS rendered"),
    React.createElement(Person, { name: "Jack", occupation: "Test Job" }, null),
    React.createElement(Person, { name: "Bec", occupation: "Test Job" }, null),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
