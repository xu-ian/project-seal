const Title = (props) => {
	return (
		<header id='title'>
			<h2>{props.title}</h2>
		</header>
	)
}

Title.defaultProps = {
	title: 'No Name'
}
export default Title
