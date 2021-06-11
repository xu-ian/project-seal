const Title = (props) => {
	return (
		<header>
			<h2>{props.title}</h2>
		</header>
	)
}

Title.defaultProps = {
	title: 'No Name'
}
export default Title
