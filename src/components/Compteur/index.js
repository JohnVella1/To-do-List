import PropTypes from 'prop-types';
import './style.scss';

const Compteur = ({total}) => (
    <p className="counter">{total} tâche{total > 1 ? 's' : ''} en cours</p>
);

Compteur.propTypes = {
    total: PropTypes.number.isRequired,
};

export default Compteur;