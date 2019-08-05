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
			disabled: true,
			waiting: false
		});
		let btn = document.getElementById('send-btn');
		btn.classList.add('hide');
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
		let inputField = document.getElementById('inputField');
		inputField.classList.add('warning');
		setTimeout(() => {
				inputField.classList.remove('warning');
		}, 1000);
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

deleteMessage = (e, index) => {
	// let conversation = this.state.responses; 
	// let pos = e.target[index];
	// conversation.splice(pos, 1);

	// this.setState({
	// 	responses: conversation
	// })
	e.target.parentElement.classList.add('hide');
	//probably too simple of a way to do this
}


	render() {
		let conversation = this.state.responses.map((response, index) =>{
			return (
			<p className={response.speaker}>
				{response.speaker === 'bot' ? <i className="fas fa-robot mr-2" /> : ''}
					{response.value}
					{response.speaker === 'person' ? <i className="fas fa-user-alt ml-2" /> : ''}
					{response.speaker === 'person' ?  <button id="delete-btn" className="ml-1" onClick={this.deleteMessage}>X</button> : ''}


			</p>)
		})
		return (
			<main>
				<div className="container gradient mt-5 p-5">
					<div className="title">
						<h1>{this.state.websiteName}</h1>
					</div>
					<div className="main-chat">
						<div>
							{conversation}
							{this.state.waiting ? <Waiting /> : ''}
						</div>
						<form onSubmit={(e) => this.onSubmit(e)}>
							<div className="col">
								<input 
									className="form-control"
									type="text"
									onChange={this.handleChange}
									value={this.state.value} 
									disabled={this.state.disabled} id="inputField" />
							</div>
							<div className="col">
								<button className="btn btn-primary" id="send-btn">Send</button>
							</div> 
						</form>
					</div>
				</div>
			</main>
		);
	}
}