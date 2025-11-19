export default function FormInput({ label, value, onChange, type = "text", placeholder = "", required = false }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 px-3 py-2 rounded focus:outline-blue-600"
      />
    </div>
  );
}
