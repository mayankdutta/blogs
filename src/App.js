import About from "./About";
import Footer from "./Footer";
import Home from "./Home";
import Missing from "./Missing";
import Header from "./Header";
import Newpost from "./Newpost";
import Postpage from "./Postpage";
import Nav from "./Nav";

const App = () => {
  return (
    <>
      <Header />
      <Home />
      <Nav />
      <Newpost />
      <Postpage />
      <About />
      <Missing />
      <Footer />
    </>
  );
}

export default App;
