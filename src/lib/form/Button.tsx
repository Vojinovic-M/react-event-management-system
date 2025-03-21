interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
    className?: string;
  }
  
export default function Button({ type, onClick, disabled, children, className }: ButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-full mt-4 px-4 py-2 rounded-lg text-white transition ${className}`}
      >
        {children}
      </button>
    );
  }