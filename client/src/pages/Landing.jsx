import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
  return (
    <div>
      <nav>
        <h2>Wisely</h2>
        <div>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>

      <main>
        <h1>Take control of your money.</h1>
        <p>Wisely helps you track income and expenses so you always know where you stand.</p>
        <Link to="/signup">Get Started</Link>
      </main>
    </div>
  );
}

export default Landing;