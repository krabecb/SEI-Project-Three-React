import React from 'react'
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function ClientList(props) {
	console.log("Here is props in ClientList:")
	console.log(props)
	const clients = props.clients.map(client => {
		return(
			<Card key={client.id} color={"orange"} id="client-card">
				<Card.Content textAlign={"center"}>
					<Card.Header>
						{client.first_name}
					</Card.Header>
					<Card.Meta>
						{client.last_name}
					</Card.Meta>
					<Card.Meta>
						{client.date_of_birth}
					</Card.Meta>
					<Card.Meta>
						{client.location}
					</Card.Meta>
				</Card.Content>
				<Card.Content id="card-content-client-list" textAlign={"center"}>
					<Button
						basic
						color='red'
						onClick={ () => props.deleteClient(client.id) }
					>
						Delete {client.first_name}
					</Button>
					<Button
						basic
						color='orange'
						onClick={ () => props.editClient(client.id) }
					>
						Edit {client.first_name}
					</Button>
					<Button
						basic
						color='green'
						onClick={ () => props.bookSession(client.id) }
					>
						Book Session
					</Button>
					<Button
						basic
						color='teal'
						onClick={ () => props.viewSessions(client.id) }
					>
						View All Sessions
					</Button>
				</Card.Content> 
			</Card>
		)
	})

	return(
		<Card.Group centered={true}>
			{clients}
		</Card.Group>
	)
}