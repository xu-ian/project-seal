const Description = (props) => {
	return (
		//Description video-component
		<div id = "description">
			<h3>{props.authorName}</h3>
			<hr></hr>
			<h4>
				{props.description}
			</h4>
		</div>
	)
}

Description.defaultProps = {
	//Default props for Description
	author : "Author",
	description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod id et tempore iure fugit consequuntur quidem voluptates laborum voluptas nisi dignissimos aliquam facilis quos atque perspiciatis, recusandae quaerat ipsa veritatis."
}

export default Description
