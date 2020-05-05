import React, { Component } from 'react'
import SessionList from '../SessionList'
import NewSession from '../NewSession'
import EditSession from '../EditSession'

export default class SessionContainer extends Component {

	constructor(props) {
		super(props) 

		this.state = {
			sessions: [],
			idOfSessionToEdit: -1
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount()")
		this.getSessions()
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

	//moved createSession to ClientContainer to have that information available for the Book Session button

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
				credentails: 'include',
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

	closeModal = () => {
		console.log("Here is closeModal in SessionContainer")
		this.setState({
			idOfSessionToEdit: -1
		})
	}

	render() {
		return(
			<React.Fragment>
				{
					this.state.sessions.length === 0
					?
					<p>There are no sessions yet.</p>
					:
					<React.Fragment>
						<h2>Sessions</h2>
						<SessionList sessions={this.state.sessions} deleteSession={this.deleteSession} editSession={this.editSession} />
					</React.Fragment>
				}
				{
					this.state.idOfSessionToEdit !== -1
					&&
					<EditSession
						key={this.state.idOfSessionToEdit}
						sessionToEdit={this.state.sessions.find((session) => session.id === this.state.idOfSessionToEdit)}
						updateSession={this.updateSession}
						closeModal={this.closeModal}
					/>
				}
			</React.Fragment>
		)
	}
}




