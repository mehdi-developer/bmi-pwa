import React, { Fragment } from 'react';
import './Result.css';

// Anim
import { motion } from 'framer-motion';

// Route
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { clear } from '../../redux/action';

// Modal
import { Modal, Button } from 'react-bootstrap';

// Language
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import en from '../languages/en';
import per from '../languages/per';
import de from '../languages/de';
import tu from '../languages/tu';
import fr from '../languages/fr';
counterpart.registerTranslations('fr', fr);
counterpart.registerTranslations('en', en);
counterpart.registerTranslations('per', per);
counterpart.registerTranslations('tu', tu);
counterpart.registerTranslations('de', de);

function MyVerticallyCenteredModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header className={props.dark ? 'dark' : null}>
				<Modal.Title className="ml-auto mr-auto" id="contained-modal-title-vcenter">
					<Translate conent="testMade" />
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className={props.dark ? 'dark overflow' : 'overflow'}>
				{props.allResults.length < 1 ? (
					<h3 className="text-center mobile">
						<Translate content="noTest" />
					</h3>
				) : null}
				{props.allResults.map((item) => {
					return (
						<React.Fragment>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="d-flex justify-content-center mt-2"
							>
								<div className="d-flex text-left flex-column">
									<b>
										<Translate content="name" />
									</b>
									<b>
										<Translate content="age" />
									</b>
									<b>
										<Translate content="height" />
									</b>
									<b>
										<Translate content="weight" />
									</b>
									<b>BMI</b>
								</div>
								<div className="d-flex text-left flex-column">
									<p className="m-0 p-0 ml-4">{item.name}</p>
									<p className="m-0 p-0 ml-4">{item.age}</p>
									<p className="m-0 p-0 ml-4">{item.height}</p>
									<p className="m-0 p-0 ml-4">{item.weight}</p>
									<p className="m-0 p-0 ml-4">
										{Math.round(item.weight / (item.height * item.height))}
									</p>
								</div>
							</motion.div>
							<div className="line mt-2" />
						</React.Fragment>
					);
				})}
			</Modal.Body>
			<Modal.Footer className={props.dark ? 'dark' : null}>
				<Button onClick={props.onHide}>
					<Translate content="close" />
				</Button>
				<Button onClick={() => props.clear()}>
					<Translate content="clear" />
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

function Result(props) {
	counterpart.setLocale(props.lang && props.lang.length < 1 ? 'en' : props.lang);
	const [ modalShow, setModalShow ] = React.useState(false);
	const bmi = Math.round(props.weight / (props.height * props.height));
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
			{props.height && props.height.length ? (
				<div>
					<h3 className="text-center">
						<Translate content="bmi" />
					</h3>
					<h1 className="text-center mt-3">{Math.round(props.weight / (props.height * props.height))}</h1>
				</div>
			) : null}
			<div className="container d-flex justify-content-center align-items-center mt-3">
				<div className="mr-3">
					{bmi <= 18.5 ? (
						<img className="img-fluid" src={require('../../assets/img/under.png')} />
					) : bmi >= 18.5 && bmi <= 25 ? (
						<img className="img-fluid" src={require('../../assets/img/normal.png')} />
					) : bmi >= 25 && bmi <= 30 ? (
						<img className="img-fluid" src={require('../../assets/img/over.png')} />
					) : bmi >= 30 ? (
						<img className="img-fluid" src={require('../../assets/img/fat.png')} />
					) : null}
				</div>
				<div className="ml-3">
					<h1>
						{bmi <= 18.5 ? (
							<Translate content="thin" />
						) : bmi >= 18.5 && bmi <= 25 ? (
							<Translate content="normal" />
						) : bmi >= 25 && bmi <= 30 ? (
							<Translate content="overweight" />
						) : bmi >= 30 ? (
							<Translate content="fat" />
						) : null}
					</h1>
				</div>
			</div>
			<div className="container">
				<div className="row">
					<div className="col-lg-6 col-md-6 col-sm-12 col-12">
						<div className="d-flex align-items-center justify-content-center">
							<button onClick={() => setModalShow(true)} className="result-btn">
								<b>
									<Translate content="allTestBtn" />
								</b>
							</button>
							<MyVerticallyCenteredModal
								dark={props.darkMode}
								show={modalShow}
								onHide={() => setModalShow(false)}
								allResults={props.allResults}
								clear={props.clear}
							/>
						</div>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 col-12">
						<div className="d-flex align-items-center justify-content-center">
							<button className="result-btn ">
								<NavLink className="nav-link" to="/test">
									<b>
										<Translate content="testAgain" />
									</b>
								</NavLink>
							</button>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

const mapState = (state) => {
	return {
		height: state.height,
		weight: state.weight,
		allResults: state.allResults,
		darkMode: state.darkMode,
		allResults: state.allResults,
		lang: state.lang
	};
};

const mapDis = (dispatch) => {
	return {
		clear: () => dispatch(clear())
	};
};

export default connect(mapState, mapDis)(Result);
