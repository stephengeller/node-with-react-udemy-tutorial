import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StripeWrapper from './StripeWrapper';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
		case null:
			return;
		case false:
			return [
				<li className="nav-dropdown" key="1">
					<a href="/auth/google">Login with Google</a>
				</li>,
				<li className="nav-dropdown" key="2">
					<a href="/auth/facebook">Login with Facebook</a>
				</li>
			];
		default:
			return [
				<li key="1">
					<StripeWrapper />
				</li>,
				<li key="2" style={{ margin: '0 10px' }}>
						Credits: {this.props.auth.credits}
				</li>,
				<li key="3">
					<a href="/api/logout">Logout</a>
				</li>
			];
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/surveys' : '/'}
						className="left brand-logo"
					>
						Emaily
					</Link>
					<ul id="nav-mobile" className="right">
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
