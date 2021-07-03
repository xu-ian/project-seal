import Deliverable from './Deliverable'
const DeliverablesStream = ({ deliverables }) => {
	return (
		<div className="deliverable-stream">
			{deliverables.map((content) => (
				<Deliverable key={content._id} content={content}></Deliverable>
			))}
		</div>
	)
}

export default DeliverablesStream