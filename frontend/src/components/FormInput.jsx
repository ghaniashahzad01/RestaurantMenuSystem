export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-[var(--muted-text)] text-sm">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded px-3 py-2
                 bg-[#2A2622] 
                 text-[var(--warm-text)]
                 border border-[#3A332E]
                 placeholder-[var(--muted-text)]
                 focus:outline-none
                 focus:border-[var(--gold)]
                 focus:ring-1 focus:ring-[var(--gold)]"
      />
    </div>
  );
}
