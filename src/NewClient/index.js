import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

export default class NewClient extends Component {
	constructor(props) {
		super(props)

		this.state = {
			first_name: '',
			last_name: '',
			date_of_birth: '',
			location: ''
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.createClient(this.state)
		//clear form
		this.setState({
			first_name: '',
			last_name: '',
			date_of_birth: '',
			location: ''
		})
	}
	

	render() {
		return(
			<Segment id='new-client'>
				<h4>Create a new client:</h4>
				<Form onSubmit={this.handleSubmit}>
					<Label id="new-client-first">First Name:</Label>
					<Form.Input
						type="text"
						name="first_name"
						value={this.state.first_name}
						placeholder="First name"
						onChange={this.handleChange}
					/>
					<Label id="new-client-last">Last Name:</Label>
					<Form.Input
						type="text"
						name="last_name"
						value={this.state.last_name}
						placeholder="Last name"
						onChange={this.handleChange}
					/>
					<Label id="new-client-dob">Date of Birth:</Label>
					<Form.Input
						type="date"
						name="date_of_birth"
						value={this.state.date_of_birth}
						onChange={this.handleChange}
					/>
					<Label id="new-client-location">Client Location:</Label>
					<Form.Input
						type="text"
						name="location"
						value={this.state.location}
						placeholder="Enter client location"
						onChange={this.handleChange}
					/>
					<Button id="add-client-button" type="Submit">Add Client</Button>
				</Form>
			</Segment>
		)
	}
}