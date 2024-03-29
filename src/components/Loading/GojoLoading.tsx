import "./index.css";

export default function GojoLoading({className} : {className: string}) {
  return (
    <div className={`box ${className}`}>
		<div className ="gojo">
			<div className="gojo_body"></div>
			<div className="gojo_body"></div>
			<div className="gojo_tail"></div>
			<div className="gojo_head"></div>
		</div>
	</div>
  )
}
