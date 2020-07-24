import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';



export default function Home() {
  return <>
    <main>
      <section className="hero-image">
        <div className="image-container">
          <div className="content"></div>
        </div>
      </section>
      <section className="welcome-message">
        <div className="wrapper">
          <h1>Welcome to Petful!</h1>
          <p>Quis Lorem et irure quis irure ad. Mollit labore laboris mollit et cupidatat aliqua est enim id est. Sint anim dolore culpa anim incididunt id laboris cupidatat id quis. Dolor exercitation dolore mollit fugiat. Culpa aliquip cillum in in.</p>
          <ul>
            <li>There are the only two types of animals in the shelter, cats and dogs.</li>
            <li>The adoption process works strictly on a first in-first out basis.</li>
            <li>People can choose to adopt either a cat, a dog, or both.</li>
            <li>People can only adopt the pets who have been at the shelter for the longest.</li>
          </ul>
          <Link to="/adopt-a-pet" class="btn large">Adopt a Pet</Link>
        </div>
      </section>
      <section className="home-footer">
        <div className="wrapper">
          <Link to="/success-stories" className="btn">Success Stories</Link>
          <button>Log In</button>
        </div>
      </section>
      <section className="login-form">
        <div className="wrapper">
          <form>
            <div className="form-field inline">
              <label>Username</label>
              <input type="text"></input>
            </div>
            <div className="form-field inline">
              <label>Password</label>
              <input type="password"></input>
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      </section>

    </main>
  </>;
}
