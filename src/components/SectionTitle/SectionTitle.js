const SectionTitle = ({ className, title, titleClassName = 'text-[var(--gray)]', subtitle, alignment = 'center' }) => {
	return <div className={`text-${alignment} ${className}`}>
		{subtitle && <h4 className={`text-xl font-bold uppercase text-[var(--green)] mb-2`}>{subtitle}</h4>}
		<h2 className={`text-4xl ${titleClassName}`}>{title}</h2>
	</div>
}
export default SectionTitle;