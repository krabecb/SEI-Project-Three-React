import React from 'react'
import { Card, Button, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default function SessionList(props) {
			const clientId = props.idOfClientToViewSessions
			const clientSessions = props.sessions.filter(session => session.client.id === clientId)
			console.log("This is clientSessions:")
			console.log(clientSessions)
			const sessions = clientSessions.map(session => {
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
						<Card.Content id="card-content-session-list" textAlign={"center"}>
							<Button
								basic
								color='red'
								onClick={ () => props.deleteSession(session.id) }
							>
								Delete {session.title}
							</Button>
							<Button
								basic
								color='orange'
								onClick={ () => props.editSession(session.id) }
							>
								Edit {session.title}
							</Button>
						</Card.Content> 
					</Card>
				)
			})

	return(
		<Modal open={true} closeIcon={true} onClose={props.closeViewSessionsModal}>
			<Modal.Content id="modal-content-session-list">
				<Card.Group centered={true}>
					{sessions}
				</Card.Group>
			</Modal.Content>
		</Modal>
	)
}