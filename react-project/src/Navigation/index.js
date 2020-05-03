import React from 'react'


export default function Navigation(props) {
	return(
		<nav>
			<p>
				Logged in as {props.email}. <span className="test-link" onClick={props.logout}>Logout</span>
			</p>
		</nav>
	)
}