import React, { Component } from 'react';
import './App.css';
import Waiting from './Components/Waiting';
import data from './Json.json';

export default class App extends Component {
	state = {
		websiteName: 'ChatBot',
		responses: [],
		robotResponses: [],
		value: '',
		waiting: false,
		disabled: false
	};

	componentDidMount() {
		this.setState({robotResponses: data.robotResponses});
		this.start();
	}

	start = () => {
		this.setState({
			responses: [
				...this.state.responses,
				{
					value: "Hello there! What's your name?",
					speaker: 'bot'
				}
			]
		});
	}

	end = () => {
		this.setState({
			responses: [
				...this.state.responses,
				{
					value: "Welp, that's the best I've got. Good luck! I've G2G!",
					speaker: 'bot'
				}
			],
			disabled: true
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		let userInput = this.state.value;
		if (userInput.length > 0){
		this.setState({
			responses: [
				...this.state.responses,
				{
					value: this.state.value,
					speaker: 'person'
				}
			],
			value: '',
			waiting: true
		});
		setTimeout(() => {
			this.robotTalk();
		}, 1500);
	} else {
		alert("blank")
	}
}

	handleChange = (e) => {
		let userInput = e.target.value;
		this.setState({
			value: userInput
		});
	}

	robotTalk = () => {

		let botHasChatted = this.state.responses.filter((item) => item.speaker === 'bot');
		if (botHasChatted.length < this.state.robotResponses.length){
			let count = 0;
			while (botHasChatted[count] !== undefined && botHasChatted[count].value !== this.state.robotResponses[count].reponse){
				count++;
			}
		this.setState({
			responses: [ 
				...this.state.responses,
					{
					value: this.state.robotResponses[count].response,
					speaker: 'bot'
					}
				],
				waiting: false,
				value: ''
			});
	} else {
		this.end();
	}
}

	render() {
		let conversation = this.state.responses.map((response, index) =>{
			return (
			<p className={response.speaker}>
				{response.speaker === 'bot' ? <i className="fas fa-robot mr-2" /> : ''}
					{response.value}
					{response.speaker === 'person' ? <i className="fas fa-user-alt ml-2" /> : ''}
			</p>)
		})
		return (
			<main>
				<div>
					<h1>{this.state.websiteName}</h1>
				</div>
				<div>
					{conversation}
					{this.state.waiting ? <Waiting /> : ''}
				</div>
				<form onSubmit={this.onSubmit}>
					<div className="col">
						<input 
							className="form-control"
							type="text"
							onChange={this.handleChange}
							value={this.state.value} />
					</div>
					<div className="col">
						<button className="btn btn-primary">Send</button>
					</div> 
				</form>
			</main>
		);
	}
}

// ## Chat Bot Project
// * *BRIEF*: Create a chat bot application that will allow a user to communicate with a Bot.
// * 1. There should be an input field and a button that allows a user to add a message item to the conversation
// * 2. The chatbot should utilize JSON data to store canned responses from the bot!
// * 3. The conversation should be stored in the State object of a Component, rendered initially from a JSON file.
// * 4. You should use the .map function to iterate the messages into into Components
// * 5. After the user adds a message item, make sure to clear the input for a good user experience!

// * BONUSES:
// * 1. Can you make it so a user could delete a message?
// * 2. Can you make it so that there is a delay between when the user submits their message and the chatbot responds?
// * 3. Can you do data validation to make sure that the user has typed a message before allowing them to submit?
// * 4. Can you make the robot respond dynamically to a message if they robot does not understand it. (for example, if the robot asks "Do you want to eat icecream or cookies" and the user says "a burger" can you make the robot say "Sorry, I do not understand?")
