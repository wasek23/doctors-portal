const Title = ({ className, title, titleClassName = 'text-[var(--green)]', description, alignment = 'center' }) => {
	return <div className={`text-${alignment} ${className}`}>
		<h2 className={`text-2xl ${titleClassName}`}>{title}</h2>
		{description && <p className={`text-xl text-[#939393] mt-3`}>{description}</p>}
	</div>
}
export default Title;