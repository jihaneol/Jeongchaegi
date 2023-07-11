import Nav from "./components/Nav";
import Search from "./components/Search"
import home_styles from "./styles/Home.module.css"

function App() {
    return (
      <div className={home_styles.home_wrap}>
        <Nav />
        <Search />
      </div>
    );
}

export default App;
