export default function Input({value, onChange, label}) {
  return (
    <>
      {label && <div>{label}</div>}
      <input
        className="border border-gray-400 rounded-lg px-4 py-2 mb-4 w-full"
        onChange={onChange}
        value={value}
      />
    </>
  );
}
