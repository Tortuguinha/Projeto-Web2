import { Link } from "react-router-dom"
import { cn } from "../../utils/clsx"
import { FaBars } from "react-icons/fa"

const SidebarRoot = ({ className, children, ...props }) => {
	return (
		<aside {...props} className={cn("w-72 p-4 flex flex-col bg-blue-400", className)}>{children}</aside>
	)
}

const SidebarHeader = ({ className, children, ...props }) => {
	return (
		<header {...props} className={cn("", className)}>{children}</header>
	)
}

const SidebarBody = ({ className, children, ...props }) => {
	return (
		<section {...props} className={cn("", className)}>{children}</section>
	)
}

const SidebarContainer = ({ className, children, ...props }) => {
	return (
		<div {...props} className={cn("", className)}>{children}</div>
	)
}

const SidebarIcon = ({ icon: Icon, className, ...props }) => {
	if (!Icon) return null
	return (
		<Icon {...props} className={cn("w-4 h-4 text-white", className)} />
	)
}

const SidebarLink = ({ href, label, icon: Icon, iconWidth, iconHeight, className, ...props }) => {
	return (
		<Link
			{...props}
			to={href}
			className={cn(
				"flex items-center gap-2 bg-blue-500 py-2 px-3 rounded text-white hover:bg-blue-600 transition-colors",
				className
			)}
		>
			{Icon && <SidebarIcon icon={Icon} />}
			<span>{label}</span>
		</Link>
	)
}

const SidebarButton = ({ handleSubmit, label, icon: Icon, className, ...props }) => {
	return (
		<button
			{...props}
			onClick={handleSubmit}
			className={cn(
				"flex items-center justify-center gap-2 rounded w-full p-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors",
				className
			)}
		>
			{Icon && <SidebarIcon icon={Icon} />}
			<span>{label}</span>
		</button>
	)
}

const SidebarButtonMenu = ({ handleSubmit, label, color, width, height, className, ...props }) => {
	return (
		<button
			{...props}
			onClick={handleSubmit}
			className={cn(
				"cursor-pointer",
				className
			)}
		>
			<SidebarIcon className={cn(`${color ?? "text-white"} ${width ?? "w-4.5"} ${height ?? "h-4.5"}`)} icon={FaBars}/>
		</button>
	)
}

const SidebarFooter = ({ className, children, ...props }) => {
	return (
		<footer {...props} className={cn("flex flex-row w-full", className)}>{children}</footer>
	)
}

const Sidebar = {
	SidebarRoot,
	SidebarHeader,
	SidebarBody,
	SidebarContainer,
	SidebarIcon,
	SidebarFooter,
	SidebarLink,
	SidebarButton,
	SidebarButtonMenu
}

export default Sidebar
