export default function Input({ label,name, type, placeholder , value , onChange ,checked , onClick , onKeyDown , className}) {
  const defulteStyleInput = "px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      </div>
      <div className="mt-2">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required
          className={className || defulteStyleInput}
          value={value}
          checked={checked}
          onChange={onChange}
          onClick={onClick}
          minLength={3}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
