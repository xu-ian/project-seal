const Video = (props) => {
	return (
		//Default video player video-component
		<div>
			<video controls id='player'>
				<source src= {props.video} type ={props.type}/>
				Your browser does not support video tag
			</video>
		</div>
	)
}

Video.defaultProps = {
	//Default props for Video
	video: "./stock.mp4",
	type: "video/mp4",
}

export default Video
