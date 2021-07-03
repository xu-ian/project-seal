import PropTypes from 'prop-types'
const ToggleButton= ({value1, value2, color, state, onClick}) =>{
	return (
		//Front-end for Form which assigns deliverables (SEAL-8 Component)
		<div>
			<button className='toggle-btn' onClick = {onClick} style={{backgroundColor:color}}>{state===1 ? value1:value2}</button>
		</div>
  );
}

ToggleButton.defaultProps = {
	color: '#047aed',
	value1: '+',
	value2: '-',
	state: 0,
}

ToggleButton.propTypes = {
	value1: PropTypes.string,
	value2: PropTypes.string,
	color: PropTypes.string,
	onClick: PropTypes.func,
	state: PropTypes.number,
}

export default ToggleButton;
