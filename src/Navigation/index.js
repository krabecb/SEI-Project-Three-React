import React from 'react'


export default function Navigation(props) {
	return(
		<nav>
			<p>
				Logged in as {props.email}. <span className="logout-link" onClick={props.logout}>Logout</span>
			</p>
		</nav>
	)
}