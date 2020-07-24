import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return <>
    <header>
      <div className="wrapper">
        <Link to="/" className="logo">Petful</Link>
        <Link to="/">Log Out</Link>
      </div>
    </header>
  </>;
}
