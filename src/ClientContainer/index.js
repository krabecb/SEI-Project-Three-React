import React, { Component } from 'react'
import ClientList from '../ClientList'
import NewClient from '../NewClient'
import EditClient from '../EditClient'
import NewSession from '../NewSession'
import SessionList from '../SessionList'
import EditSession from '../EditSession'

export default class ClientContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			sessions: [],
			clients: [],
			idOfClientToEdit: -1,
			idOfSessionToEdit: -1,
			idOfClientToViewSessions: -1,
			idOfClientToAdd: -1
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount()")
		this.getClients()
		this.getSessions()
	}

	getClients = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/clients/"
			const clientsResponse = await fetch(url, { credentials: 'include' })
			const clientsJson = await clientsResponse.json()

			this.setState({
				clients: clientsJson.data
			})
		} catch(error) {
			console.error("There was a problem getting client data:", error)
		}
	}

	getSessions = async () => {
		try {
			const url = process.env.REACT_APP_API_URL + "/api/sessions/"
			const sessionsResponse = await fetch(url, { credentials: 'include'})
			const sessionsJson = await sessionsResponse.json()

			this.setState({
				sessions: sessionsJson.data
			})
		} catch(error) {
			console.error("There was a problem getting session data:", error)
		}
	}

	deleteClient = async (idOfClientToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/clients/" + idOfClientToDelete

		try {
			const deleteClientResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})
			console.log("deleteClientResponse", deleteClientResponse)
			const deleteClientJson = await deleteClientResponse.json()
			console.log("deleteClientJson", deleteClientJson)

			if(deleteClientResponse.status === 200) {
				this.setState({
					clients: this.state.clients.filter(client => client.id !== idOfClientToDelete)
				})
			}
		} catch(error) {
			console.error("There was a problem deleting the client:")
			console.error(error)
		}
	}

	deleteSession = async (idOfSessionToDelete) => {
		const url = process.env.REACT_APP_API_URL + "/api/sessions/" + idOfSessionToDelete

		try {
			const deleteSessionResponse = await fetch(url, {
				credentials: 'include',
				method: 'DELETE'
			})
			console.log("deleteSessionResponse", deleteSessionResponse)
			const deleteSessionJson = await deleteSessionResponse.json()
			console.log("deleteSessionJson", deleteSessionJson)

			if(deleteSessionResponse.status === 200) {
				this.setState({
					sessions: this.state.sessions.filter(session => session.id !== idOfSessionToDelete)
				})
			}
		} catch(error) {
			console.error("There was a problem deleting the session:")
			console.error(error)
		}
	}

	createClient = async (clientToAdd) => {
		console.log("Here is the client you're trying to add:")
		console.log(clientToAdd)

		try {
			const url = process.env.REACT_APP_API_URL + "/api/clients/"
			const createClientResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body: JSON.stringify(clientToAdd),
				headers: { 'Content-Type': 'application/json' }
			})
			console.log("createClientReponse", createClientResponse)
			const createClientJson = await createClientResponse.json()
			console.log("Here's what happened after trying to add a client:")
			console.log(createClientJson)

			if(createClientResponse.status === 201) {
				this.setState({
					clients: [...this.state.clients, createClientJson.data]
				})
			}
		} catch(error) {
			console.error("There was a problem adding a client")
			console.error(error)
		}
	}

	bookSession = (idOfClientToAdd) => {
		console.log("You are trying to add a session to a client with id:", idOfClientToAdd)

		this.setState({
			idOfClientToAdd: idOfClientToAdd
		})
	}

	viewSessions = (idOfClientToViewSessions) => {
		console.log("You are trying to view sessions that belong to client id:", idOfClientToViewSessions)

		this.setState({
			idOfClientToViewSessions: idOfClientToViewSessions
		})
	}

	createSession = async (sessionToAdd) => {
		console.log("Here is the session you're trying to add:")
		console.log(sessionToAdd)

		try {
			const url = process.env.REACT_APP_API_URL + "/api/sessions/" +this.state.idOfClientToAdd
			const createSessionResponse = await fetch(url, {
				credentials: 'include',
				method: 'POST',
				body:JSON.stringify(sessionToAdd),
				headers: { 'Content-Type': 'application/json'}
			})
			console.log("createSessionResponse", createSessionResponse)
			const createSessionJson = await createSessionResponse.json()
			console.log("Here's what happened after trying to add a session:")
			console.log(createSessionJson)

			if(createSessionResponse.status === 201) {
				this.setState({
					sessions: [...this.state.sessions, createSessionJson.data],
					idOfClientToAdd: -1
				})
			}
		} catch(error) {
			console.error("There was a problem adding a session")
			console.error(error)
		}
	}

	editClient = (idOfClientToEdit) => {
		console.log("You are trying to edit a client with id:", idOfClientToEdit)

		this.setState({
			idOfClientToEdit: idOfClientToEdit
		})
	}

	updateClient = async (updatedClientInfo) => {
		const url = process.env.REACT_APP_API_URL + "/api/clients/" + this.state.idOfClientToEdit

		try {
			const updateClientResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(updatedClientInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("updateClientResponse", updateClientResponse)
			const updateClientJson = await updateClientResponse.json()
			console.log("updateClientJson", updateClientJson)

			console.log(updateClientResponse.status)
			console.log(updateClientResponse.headers)

			if(updateClientResponse.status === 200) {
				const clients = this.state.clients
				const indexOfClientBeingUpdated = clients.findIndex(client => client.id === this.state.idOfClientToEdit)
				clients[indexOfClientBeingUpdated] = updateClientJson.data
				this.setState({
					clients: clients,
					idOfClientToEdit: -1 //close the modal
				})
			}
		} catch(error) {
			console.error("There was a problem updating client info")
			console.error(error)
		}
	}

	closeModal = () => {
		console.log("Here is closeModal in ClientContainer")
		this.setState({
			idOfClientToEdit: -1
		})
	}

	editSession = (idOfSessionToEdit) => {
		console.log("You are trying to edit a session with id:", idOfSessionToEdit)

		this.setState({
			idOfSessionToEdit: idOfSessionToEdit
		})
	}

	updateSession = async (updatedSessionInfo) => {
		const url = process.env.REACT_APP_API_URL + "/api/sessions/" + this.state.idOfSessionToEdit

		try {
			const updateSessionResponse = await fetch(url, {
				credentials: 'include',
				method: 'PUT',
				body: JSON.stringify(updatedSessionInfo),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log("updateSessionResponse", updateSessionResponse)
			const updateSessionJson = await updateSessionResponse.json()
			console.log("updateSessionJson", updateSessionJson)

			console.log(updateSessionResponse.status)
			console.log(updateSessionResponse.headers)

			if(updateSessionResponse.status === 200) {
				const sessions = this.state.sessions
				const indexOfSessionBeingUpdated = sessions.findIndex(session => session.id === this.state.idOfSessionToEdit)
				sessions[indexOfSessionBeingUpdated] = updateSessionJson.data

				this.setState({
					sessions: sessions,
					idOfSessionToEdit: -1
				})
			}
		} catch(error) {
			console.error("There was a problem updating session info")
			console.error(error)
		}
	}

	closeEditSessionModal = () => {
		console.log("Here is closeModal in SessionContainer")
		this.setState({
			idOfSessionToEdit: -1
		})
	}

	closeBookSessionModal = () => {
		console.log("Here is closeBookSessionModal in ClientContainer")
		this.setState({
			idOfClientToAdd: -1
		})
	}

	closeViewSessionsModal = () => {
		console.log("Here is closeViewSessionsModal in ClientContainer")
		this.setState({
			idOfClientToViewSessions: -1
		})
	}

	render() {
		console.log("Here is this.state in ClientContainer after getClients():")
		console.log(this.state.clients[0])
		return(
			<React.Fragment>
				{ 
					this.state.clients.length === 0 
					?
					<React.Fragment>
						<NewClient createClient={this.createClient} />
						<p>There are no clients yet.</p>
					</React.Fragment>
					:
					<React.Fragment>
						<NewClient createClient={this.createClient} />
						<h2 id="clients-h2">Clients</h2>
						<ClientList clients={this.state.clients} deleteClient={this.deleteClient} editClient={this.editClient} bookSession={this.bookSession} viewSessions={this.viewSessions} />
					</React.Fragment>
				}
				{
					this.state.idOfClientToEdit !== -1
					&&
					<EditClient
						key={this.state.idOfClientToEdit}
						clientToEdit={this.state.clients.find((client) => client.id === this.state.idOfClientToEdit)}
						updateClient={this.updateClient}
						closeModal={this.closeModal}
					/>
				}
				{
					this.state.idOfSessionToEdit !== -1
					&&
					<EditSession
						key={this.state.idOfSessionToEdit}
						sessionToEdit={this.state.sessions.find((session) => session.id === this.state.idOfSessionToEdit)}
						updateSession={this.updateSession}
						closeEditSessionModal={this.closeEditSessionModal}
					/>
				}
				{
					this.state.idOfClientToAdd !== -1
					&&
					<NewSession createSession={this.createSession} closeBookSessionModal={this.closeBookSessionModal}/>
				}
				{
					this.state.idOfClientToViewSessions !== -1
					&&
					<React.Fragment>
						<h2>Sessions</h2>
						<SessionList sessions={this.state.sessions} deleteSession={this.deleteSession} editSession={this.editSession} closeViewSessionsModal={this.closeViewSessionsModal} idOfClientToViewSessions={this.state.idOfClientToViewSessions} />
					</React.Fragment>
				}
			</React.Fragment>
		)
	}
}