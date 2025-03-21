interface TextareaProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  required: boolean;
}

export default function Textarea({ name, value, onChange, placeholder = "", required = false}: TextareaProps) {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full mt-4 p-2 border border-gray-400 rounded-md"
      />
    );
};