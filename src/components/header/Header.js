import React from 'react';
import './Header.css';
// Route
import { NavLink } from 'react-router-dom';

// Dark mode
import { changeTheme } from '../../redux/action';

// Redux
import { connect } from 'react-redux';

// About Modal
import { Button, Modal } from 'react-bootstrap';

// Language
import Translate from 'react-translate-component';

function MyVerticallyCenteredModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header className={props.darkMode ? 'dark' : null} closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<Translate content="about" />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={props.darkMode ? 'dark' : null}>
				<p>
					BMI App developed by
					<a
						className="ml-1 mr-1"
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/mehdi-developer"
					>
						Mehdi Faraji
					</a>
					thanks to my dad Dr. Faraji nutrition specialist .
					<p> Reference : Krause's Food and Nutrition Care Process </p>
				</p>
			</Modal.Body>
			<Modal.Footer className={props.darkMode ? 'dark' : null}>
				<Button onClick={props.onHide}>
					<Translate content="close" />
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

function Header(props) {
	const [ modalShow, setModalShow ] = React.useState(false);

	return (
		<div className="header d-flex justify-content-between ml-3 mr-3 align-items-center">
			<div>
				<img
					onClick={() => setModalShow(true)}
					className="logo img-fluid about-logo"
					src={require('../../assets/img/about.png')}
				/>
				<MyVerticallyCenteredModal
					darkMode={props.darkMode}
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>
			</div>

			<NavLink to="/" className="d-flex align-items-center main-logo nav-link">
				<img className="logo img-fluid" src={require('../../assets/img/logo.png')} />
				<b className="logo-text ml-1">BMI</b>
			</NavLink>

			<div>
				<img
					onClick={() => props.changeTheme(!props.darkMode)}
					className="logo img-fluid darkmode-logo"
					src={require('../../assets/img/dark.png')}
				/>
			</div>
		</div>
	);
}

const mapState = (state) => {
	return {
		darkMode: state.darkMode,
		lang: state.lang
	};
};

const mapDis = (dispatch) => {
	return {
		changeTheme: (mode) => dispatch(changeTheme(mode))
	};
};

export default connect(mapState, mapDis)(Header);
