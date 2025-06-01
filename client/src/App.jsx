import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="transition-all flex md:grid md:grid-cols-[minmax(13rem,15rem)_1fr] h-dvh">
      <div className="hidden sm:flex">
        <Sidebar />
      </div>
      <div className="overflow-hidden w-ful">
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default App;
