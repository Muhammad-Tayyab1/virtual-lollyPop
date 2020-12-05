import { Link } from 'gatsby'
import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <h1 className="head"><Link to="/">Virtual Lolly</Link></h1>

            <p>because we all know someone<br/> who deserves some sugar.</p>
        </div>
    )
}
