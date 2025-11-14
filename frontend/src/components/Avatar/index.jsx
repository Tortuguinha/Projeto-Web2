import { cn } from "../../utils/clsx"

const Avatar = ({ source, className, ...props }) => {
	return (
		<img {...props} src={source} className={cn("w-4 h-4 rounded", className)} />
	)
}

export default Avatar;
