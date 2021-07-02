import Deliverable from './Deliverable'
const DeliverablesStream = ({ deliverables }) => {
	return (
		<div className="content-stream">
			{deliverables.map((content) => (
				<Deliverable key={content.id} content={content}></Deliverable>
			))}
		</div>
	)
}

export default DeliverablesStream