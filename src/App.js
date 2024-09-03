import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import { useEffect } from 'react';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';

// This is the main App.js from which I am Routing header and home pages.

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>  
          {/* decided to route initially at login page after that to home page */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={
            <>
              <Header />
              <Home />
            </>
          } />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
