import React from 'react';
import './Lang.css';

// Anim
import { motion } from 'framer-motion';

// Route
import { NavLink } from 'react-router-dom';

// Carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

// Redux
import { connect } from 'react-redux';
import { setLang } from '../../redux/action';

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

function Lang(props) {
	counterpart.setLocale(props.lang.length < 1 ? 'en' : props.lang);
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5">
			<h4 className="text-center">
				<Translate content="lang" />
			</h4>
			<OwlCarousel className="owl-theme" margin={0} nav>
				<div class="item">
					<NavLink to="/test">
						<img
							onClick={() => {
								props.setLang('de');
							}}
							className="img-fluid flag"
							src={require('../../assets/img/countries/germany.png')}
						/>
					</NavLink>
				</div>
				<div class="item">
					<NavLink to="/test">
						<img
							onClick={() => props.setLang('en')}
							className="img-fluid flag"
							src={require('../../assets/img/countries/us.png')}
						/>
					</NavLink>
				</div>
				<div class="item">
					<NavLink to="/test">
						<img
							onClick={() => props.setLang('en')}
							className="img-fluid flag"
							src={require('../../assets/img/countries/uk.png')}
						/>
					</NavLink>
				</div>
				<div class="item">
					<NavLink to="/test">
						<img
							onClick={() => props.setLang('per')}
							className="img-fluid flag"
							src={require('../../assets/img/countries/iran.png')}
						/>
					</NavLink>
				</div>
				<div class="item">
					<NavLink to="/test">
						<img
							onClick={() => props.setLang('tu')}
							className="img-fluid flag"
							src={require('../../assets/img/countries/turkey.png')}
						/>
					</NavLink>
				</div>
				<div class="item">
					<NavLink to="/test">
						<img
							onClick={() => props.setLang('fr')}
							className="img-fluid flag"
							src={require('../../assets/img/countries/france.png')}
						/>
					</NavLink>
				</div>
			</OwlCarousel>
		</motion.div>
	);
}

const mapState = (state) => {
	return {
		lang: state.lang
	};
};

const mapDis = (dispatch) => {
	return {
		setLang: (lang) => dispatch(setLang(lang))
	};
};

export default connect(mapState, mapDis)(Lang);
