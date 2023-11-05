export default function Button({onClick, children, noMargin}) {
  return (
    <button 
      className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" + (noMargin ? "" : " mb-4")}
      onClick={onClick}>{children}</button>
  );
}
