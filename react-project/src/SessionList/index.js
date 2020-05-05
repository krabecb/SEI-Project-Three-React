import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function SessionList(props) {
	console.log("Here is props in SessionList:")
	console.log(props)
	const sessions = props.sessions.map(session => {
		return(
			<Card key={session.id} color={"blue"}>
				<Card.Content textAlign={"center"}>
					<Card.Header>
						{session.title}
					</Card.Header>
					<Card.Meta>
						{session.date}
					</Card.Meta>
					<Card.Meta>
						{session.time}
					</Card.Meta>
					<Card.Meta>
						{session.location}
					</Card.Meta>
					<Card.Meta>
						{session.comments}
					</Card.Meta>
				</Card.Content>
				<Card.Content textAlign={"center"}>
					<Button
						basic
						color='red'
						onClick={ () => props.deleteSession(session.id) }
					>
						Delete {session.title}
					</Button>
					<Button
						basic
						color='green'
						onClick={ () => props.editSession(session.id) }
					>
						Edit {session.title}
					</Button>
				</Card.Content> 
			</Card>
		)
	})

	return(
		<Card.Group centered={true}>
			{sessions}
		</Card.Group>
	)
}