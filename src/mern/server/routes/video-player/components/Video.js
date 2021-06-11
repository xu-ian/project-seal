const Video = (props) => {
	return (
		<div>
			<video poster = {props.thumbnail} muted controls width="70%">
				<source src= {props.video} type ={props.type}/>
				Your browser does not support video tag
			</video>
		</div>
	)
}

Video.defaultProps = {
	video: "./stock.mp4",
	type: "video/mp4",
	thumbnail: ".default.png"
}

export default Video
