import React, { Component } from 'react'
import ClientList from '../ClientList'
import NewClient from '../NewClient'
import EditClient from '../EditClient'

export default class ClientContainer extends Component {

	constructor(props) {
		super(props)

		this.state = {
			clients: [],
			idOfClientToEdit: -1
		}
	}

	componentDidMount() {
		console.log("This is componentDidMount()")
		this.getClients()
		
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
			console.log("CreateClientReponse", createClientResponse)
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

	render() {
		console.log("Here is this.state in ClientContainer after getClients():")
		console.log(this.state.clients[0])
		return(
			<React.Fragment>
				{ 
					this.state.clients.length === 0 
					?
					<p>There are no clients yet.</p>
					:
					<React.Fragment>
						<NewClient createClient={this.createClient} />
						<h2>Clients</h2>
						<ClientList clients={this.state.clients} deleteClient={this.deleteClient} editClient={this.editClient} />
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
			</React.Fragment>
		)
	}
}