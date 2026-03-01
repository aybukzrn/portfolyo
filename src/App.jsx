import "./App.css";
import HomePage from "./pages/HomePage";
import StarField from "./components/StarField";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="">
      <StarField>
        <div className="">
          <Navigation />
        </div>

        <HomePage />
        <Footer />

      </StarField>
    </div>
  );
}