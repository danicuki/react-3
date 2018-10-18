import React, { Component } from 'react';
import './App.css';
import Card from "./Card.js";
import ArtistCard from "./ArtistCard.js";
import { Route, Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const BASE_URL = "https://peaceful-badlands-98440.herokuapp.com"
    const options = {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email: "rafael@laboratoria.la", password: "banana" })
    };

    fetch(`${BASE_URL}/login`, options)
      .then(res => {
        const options = {
          method: "get",
          credentials: 'include'
        };

        fetch(`${BASE_URL}/artists`, options)
          .then(res => res.json())
          .then(data => this.setState({ artists: data }));
        });
  }

  handleClick() {
  }

  render() {
    return (
      <div>
        <Menu />
        <hr />
        <div class='content'>
          <Route path='/artists' render={ () => 
            <div> 
              {this.state.artists.map((artist) => 
                <ArtistCard name={artist.name} genre={artist.genre} id={artist.id} />
              )}
            </div>
          } />
          <Route path="/" exact={true} component={Home} />
        </div>
      </div>
    );
  }
}

const Home = () => {
  return (<h2>Página princial</h2>)  
}

const Menu = () => {
  return (
    <ul class='menu'>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/artists">Artistas</Link></li>
      <li><Link to="/radios">Rádios</Link></li>
    </ul>
  )
}
export default App;
