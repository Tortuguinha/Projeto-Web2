import { cn } from "../../utils/clsx";

const AlertRoot = ({ children, type, className = '', ...props }) => {
  const typeClasses = {
    success: 'bg-green-100 text-green-800 border border-green-300',
    error: 'bg-red-100 text-red-800 border border-red-300',
    warning: 'bg-yellow-100 text-yellow-800 border border-yellow-300',
    info: 'bg-blue-100 text-blue-800 border border-blue-300',
  };

  return (
    <div {...props} className={cn('fixed bottom-5 right-5 p-4 rounded-md flex items-center gap-2', typeClasses[type], className)}>
      {children}
    </div>
  );
};

const AlertText = ({ children, className, ...props }) => (
  <p {...props} className={cn('', className)}>
    {children}
  </p>
);

const AlertIcon = ({ icon: Icon, className, ...props }) => (
  <Icon {...props} className={cn('w-5 h-5', className)} />
);

const Alert = {
  AlertRoot,
  AlertText,
  AlertIcon,
};

export default Alert;
