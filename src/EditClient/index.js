import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

export default class EditClient extends Component {
	constructor(props) {
		super(props)

		console.log("Here is props in the editClient constructor:")
		console.log(props)

		this.state = {
			first_name: props.clientToEdit.first_name,
			last_name: props.clientToEdit.last_name,
			date: props.clientToEdit.date,
			location: props.clientToEdit.location
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		console.log(this.state)
		event.preventDefault()
		this.props.updateClient(this.state)
	}

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.closeModal}>
				<Header id="edit-client-header">
					<h3>Edit client info</h3>
				</Header>
				<Modal.Content id="modal-content-edit">
					<Form onSubmit={this.handleSubmit}>
						<Label id="edit-client-first">First Name:</Label>
						<Form.Input
							type="text"
							name="first_name"
							value={this.state.first_name}
							placeholder="First name"
							onChange={this.handleChange}
						/>
						<Label id="edit-client-last">Last Name:</Label>
						<Form.Input
							type="text"
							name="last_name"
							value={this.state.last_name}
							placeholder="Last name"
							onChange={this.handleChange}
						/>
						<Label id="edit-client-dob">Date of Birth:</Label>
						<Form.Input
							type="date"
							name="date_of_birth"
							value={this.state.date_of_birth}
							onChange={this.handleChange}
						/>
						<Label id="edit-client-location">Client Location:</Label>
						<Form.Input
							type="text"
							name="location"
							value={this.state.location}
							placeholder="Enter client location"
							onChange={this.handleChange}
						/>
						<Modal.Actions>
							<Button id="update-client-button" type="Submit">Update Client</Button>
						</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}