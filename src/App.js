import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div>
        <header>
          <nav className="navbar">
            <div className="container-fluid">
              <div className="container-fluid row">
                <div className="col-8 offset-1">
                  <Link className="nav navbar-brand" to="/">
                    <img width="20" height="20" src="http://www.pngmart.com/files/1/Headphones-Clip-Art-PNG.png" alt="headphones"/>
                    Bloc Jams
                  </Link>
                </div>
                <div className="col">
                  <Link className="nav navbar-text" to='/'>Landing</Link>
                  <Link className="nav navbar-text" to='/library'>Library</Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
