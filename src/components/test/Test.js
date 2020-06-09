import React from 'react';
import './Test.css';

// Anim
import { motion } from 'framer-motion';

// Route
import { NavLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { test } from '../../redux/action';

//Form
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

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

const initialValues = {
	name: null,
	age: null,
	height: null,
	weight: null
};
const validationSchema = yup.object({
	name: yup.string().required('Required'),
	age: yup.number('Age should be a number').required('Required'),
	height: yup.number('Age should be a number').required('Required'),
	weight: yup.number('Age should be a number').required('Required')
});
function Test(props) {
	counterpart.setLocale(props.lang.length < 1 ? 'en' : props.lang);

	const onSubmit = (values) => {
		props.test(values);
		props.history.push('/result');
	};
	const name = counterpart.translate('name');
	const age = counterpart.translate('age');
	const weight = counterpart.translate('weightPlaceholder');
	const height = counterpart.translate('heightPlaceholder');
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			<Form>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="d-flex justify-content-center mt-5"
				>
					<div className="d-flex text-left flex-column">
						<b className="list">
							<Translate content="name" />
						</b>
						<b className="list">
							<Translate content="age" />
						</b>
						<b className="list">
							<Translate content="height" />
						</b>
						<b className="list">
							<Translate content="weight" />
						</b>
					</div>
					<div className="d-flex text-left flex-column">
						<Field className="ml-3 mt-2 field" name="name" placeholder={name} />
						<Field className="ml-3 mt-2 field" name="age" placeholder={age} />
						<Field className="ml-3 mt-2 field" name="height" placeholder={height} />
						<Field className="ml-3 mt-2 field" name="weight" placeholder={weight} />
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="row mt-3"
				>
					<div className="col-12 d-flex justify-content-center align-items-center">
						<button className="submit mt-3" type="submit">
							<Translate content="submit" />
						</button>
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="row mt-2"
				>
					<div className="col-12 d-flex justify-content-center align-items-center">
						<NavLink className="nav-link" to="/lang">
							<button className="submit" type="submit">
								<Translate content="changeLang" />
							</button>
						</NavLink>
					</div>
				</motion.div>
			</Form>
		</Formik>
	);
}

const mapState = (state) => {
	return {
		darkMode: state.darkMode,
		name: state.name,
		age: state.age,
		height: state.height,
		weight: state.weight,
		allResults: state.allResults,
		lang: state.lang
	};
};

const mapDis = (dispatch) => {
	return {
		test: (values) => dispatch(test(values))
	};
};

export default connect(mapState, mapDis)(Test);
