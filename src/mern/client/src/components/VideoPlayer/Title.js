const Title = (props) => {
	return (
		//Video title video-component
		<header id='title'>
			<h2>{props.title}</h2>
		</header>
	)
}

Title.defaultProps = {
	//Default prop for title
	title: 'No Name'
}
export default Title
