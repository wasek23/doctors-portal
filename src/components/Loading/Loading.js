const Loading = () => {
	return <div className='flex flex-col items-center justify-center py-10' style={{ minHeight: 'calc(100vh - 64px)' }}>
		<progress className='progress w-56'></progress>
	</div>
}
export default Loading;