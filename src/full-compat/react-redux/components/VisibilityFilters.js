import { createElement } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { setFilter } from '../redux/actions';
import { VISIBILITY_FILTERS } from '../constants';
import styles from '../styles.css';

const VisibilityFilters = ({ activeFilter, setFilter }) => {
	return (
		<div className={styles['visibility-filters']}>
			{Object.keys(VISIBILITY_FILTERS).map(filterKey => {
				const currentFilter = VISIBILITY_FILTERS[filterKey];
				return (
					<span
						id={`filter-${currentFilter}`}
						key={`visibility-filter-${currentFilter}`}
						className={cx(
							styles['filter'],
							currentFilter === activeFilter && styles['filter--active']
						)}
						onClick={() => {
							setFilter(currentFilter);
						}}
					>
						{currentFilter}
					</span>
				);
			})}
		</div>
	);
};

const mapStateToProps = state => {
	return { activeFilter: state.visibilityFilter };
};
// export default VisibilityFilters;
export default connect(
	mapStateToProps,
	{ setFilter }
)(VisibilityFilters);
