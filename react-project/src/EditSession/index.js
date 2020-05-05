import React, { Component } from 'react'
import { Form, Button, Label, Modal, Header } from 'semantic-ui-react'

export default class EditSession extends Component {
	constructor(props) {
		super(props)

		console.log("Here is props in the editSession constructor:")
		console.log(props)

		this.state = {
			title: props.sessionToEdit.title,
			date: props.sessionToEdit.date,
			time: props.sessionToEdit.time,
			location: props.sessionToEdit.location,
			comments: props.sessionToEdit.comments
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
		this.props.updateSession(this.state)
	}

	render() {
		return(
			<Modal open={true} closeIcon={true} onClose={this.props.closeEditSessionModal}>
				<Header>
					<h3>Edit session info</h3>
				</Header>
				<Modal.Content>
					<Form onSubmit={this.handleSubmit}>
						<Label>Title:</Label>
							<Form.Input
								type="text"
								name="title"
								value={this.state.title}
								placeholder="Title"
								onChange={this.handleChange}
							/>
							<Label>Date:</Label>
							<Form.Input
								type="date"
								name="date"
								value={this.state.date}
								placeholder="Date"
								onChange={this.handleChange}
							/>
							<Label>Time:</Label>
							<Form.Input
								type="text"
								name="time"
								value={this.state.time}
								onChange={this.handleChange}
							/>
							<Label>Session Location:</Label>
							<Form.Input
								type="text"
								name="location"
								value={this.state.location}
								placeholder="Enter session location"
								onChange={this.handleChange}
							/>
							<Label>Comments:</Label>
							<Form.Input
								type="text"
								name="comments"
								value={this.state.comments}
								placeholder="Enter comments"
								onChange={this.handleChange}
							/>
							<Modal.Actions>
								<Button type="Submit">Update Session</Button>
							</Modal.Actions>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}
}