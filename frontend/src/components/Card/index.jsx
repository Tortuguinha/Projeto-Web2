import { cn } from "../../utils/clsx"
import { Link } from "react-router-dom"

const CardRoot = ({ className, children, ...props }) => {
	return (
		<div {...props} className={cn("flex flex-row", className)}>{children}</div>
	)
};

const CardContainer = ({ className, children, ...props }) => {
	return (
		<section {...props} className={cn("", className)}>{children}</section>
	)
};

const CardAvatar = ({ source, className, ...props }) => {
	return (
		<img {...props} src={source} className={cn("w-8 h-8 rounded", className)} />
	)
}

const CardTitle = ({ label, className, ...props }) => {
	return (
		<h1 {...props} className={cn("truncate text-md text-white font-semibold", className)}>{label}</h1>
	)
};

const CardDescription = ({ label, className, ...props }) => {
	return (
		<p {...props} className={cn("", className)}>{label}</p>
	)
};

const CardLink = ({ href, label, className, ...props }) => {
  return (
    <Link to={href} {...props} className={cn("", className)}>{label}</Link>
  );
};

const CardButton= ({ handleClick, label, className, ...props }) => {
	return (
		<button {...props} className={cn("", className)} onClick={handleClick}>{label}</button>
	)
};

const CardFooter = ({ className, children, ...props }) => {
	return (
		<footer {...props} className={cn("", className)}>{children}</footer>
	)
};

const Card = {
	CardRoot,
	CardContainer,
	CardAvatar,
	CardTitle,
	CardDescription,
	CardLink,
	CardButton,
	CardFooter
};

export default Card;
