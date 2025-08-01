import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";
import "./assets/style/App.css";

const App = () => {
  return (
    <div className="App">
      <ParticleBackground />
      <CustomCursor />
      <div className="main-content">
        <h1 className="text-zone">Hi, I'm Mujtaba Malik</h1>
        <p className="text-zone">Full Stack MERN Developer</p>
      </div>
    </div>
  );
};

export default App;