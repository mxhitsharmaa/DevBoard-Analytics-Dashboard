
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
        </div>

        <main className="min-w-0 flex-1">
          <Header />

          <div className="mx-auto w-full max-w-[1600px] p-5 sm:p-8">
            <Dashboard />
          </div>

          <footer className="border-t border-slate-800 px-5 py-5 text-center text-xs text-slate-500 sm:px-8">
            DevBoard · Developer Analytics Dashboard
          </footer>
        </main>
      </div>
    </div>
  );
}
