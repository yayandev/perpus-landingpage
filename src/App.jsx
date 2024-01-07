import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Web from "./routes/web.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="max-w-7xl  mx-auto p-3">
          <Web />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
