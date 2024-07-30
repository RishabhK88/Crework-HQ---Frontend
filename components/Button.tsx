export default function Button({
  text,
  icon,
  onClick,
}: {
  text: string;
  icon?: any;
  onClick?: any;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick();
      }}
      className="flex items-center justify-center align-center focus:outline-none text-white bg-gradient-to-b from-[#4C38C2] to-[#2F2188] border  hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
    >
      {text}
      &nbsp;{icon}
    </button>
  );
}
