import { Link } from 'gatsby'
import React from 'react'

export default function Header() {
    return (
        <div className="container">
            <h1><Link to="/">Virtual Lolly</Link></h1>

            <p>because we all know someone who deserves some sugar.</p>
        </div>
    )
}
