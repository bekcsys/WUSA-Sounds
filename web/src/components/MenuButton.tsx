import type { WelcomeOption } from "../types";

interface MenuButtonProps {
  option: WelcomeOption;
  size: number;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function MenuButton({
  option,
  size,
  onClick,
  disabled,
  selected,
}: MenuButtonProps) {
  const boxSize = Math.round(size * 0.88);
  const logoSize = Math.round(boxSize * 0.68);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-start flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed min-w-0 rounded-xl transition-all ${selected ? "ring-2 ring-navy ring-offset-2 bg-navy/5" : ""}`}
      style={{ width: size }}
    >
      <div
        className={`flex justify-center items-center border-[3px] rounded-[28%] bg-brand shadow-button flex-shrink-0 ${selected ? "border-navy ring-2 ring-navy/30" : "border-navyBorder"}`}
        style={{
          width: boxSize,
          height: boxSize,
        }}
      >
        <img
          src={option.logo}
          alt=""
          className="object-contain"
          style={{ width: logoSize, height: logoSize }}
          width={logoSize}
          height={logoSize}
        />
      </div>
      <span className="font-medium text-textPrimary text-center w-full px-1 mt-2 block text-sm tablet:text-base leading-tight">
        {option.label}
      </span>
    </button>
  );
}
