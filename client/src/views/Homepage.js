import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Login from '../components/Login';
import Register from '../components/Register';
import '../style/Homepage.css';

export default class Homepage extends Component {
	constructor(props) {
		super(props);
	}

	state = {
		isLoginPage: false,
		isLogged: false,
	};

	changePage = () => {
		this.setState({ isLoginPage: !this.state.isLoginPage });
	};

	componentDidMount() {
		document.body.style = `
            background-image: url('https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80');
            height: 100vh;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
		`;

		(() => {
			const token = localStorage.getItem('token');
			axios
				.get('user/jwt', { headers: { Authorization: 'Bearer ' + token } })
				.then(response => {
					this.setState({ isLogged: true, loggedUser: response.data });
				});
		})();
	}

	render() {
		if (this.state.isLogged) {
			return (
				<Redirect
					to={{
						pathname: '/dashboard',
						state: { loggedUser: this.state.loggedUser },
					}}
				/>
			);
		}
		return (
			<div>
				<div
					className="row"
					style={{ 'margin-top': '7rem' }}>
					<div
						className="col-6 justify-content-center d-flex"
						style={{ 'border-right': '.1rem solid rgba(255, 255, 255, 0.5)' }}>
						<h2
							className="text-center text-white font-weight-bold pl-5 pr-3 mt-5"
							style={{ fontFamily: 'sans-serif', fontSize: '4rem' }}>
							Manage your time
							<br /> with our <br />
							useful{' '}
							<span className="text-light" style={{ 'text-decoration': 'underline' }}>
								Day Planner
							</span>
						</h2>
					</div>
					<div
						className="col-6 justify-content-center d-flex"
						style={{ 'border-left': '.1rem solid rgba(255, 255, 255, 0.5)' }}>
						{this.state.isLoginPage ? (
							<Login func={this.changePage} />
						) : (
							<Register func={this.changePage} />
						)}
					</div>
				</div>
			</div>
		);
	}
}
