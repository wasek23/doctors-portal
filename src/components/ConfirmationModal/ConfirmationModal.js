const ConfirmationModal = ({ title, body, onConfirm }) => {
	return <>
		<input type='checkbox' id='confirmationModal' className='modal-toggle' />
		<div className='modal'>
			<div className='modal-box'>
				<h3 className='font-bold text-lg'>{title}</h3>
				<p className='py-4'>{body}</p>
				<div className='modal-action'>
					<label htmlFor='confirmationModal' className='btn' onClick={onConfirm}>Confirm</label>
					<label htmlFor='confirmationModal' className='btn gray'>Cancel</label>
				</div>
			</div>
		</div>
	</>
}
export default ConfirmationModal;