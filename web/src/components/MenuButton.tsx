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
      className="flex flex-col items-center justify-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed min-w-[88px] min-h-touch-target tablet:min-h-0 rounded-2xl border-2 border-transparent bg-card hover:bg-navy/5 active:bg-navy/10 transition-all py-1.5 px-2 tablet:py-2 tablet:px-3 rounded-lg"
      style={{ width: size }}
    >
      <div
        className="flex justify-center items-center overflow-hidden rounded-[28%] shadow-button flex-shrink-0 border-2 border-navyBorder"
        style={{
          width: boxSize,
          height: boxSize,
          backgroundColor: option.color,
        }}
      >
        <img
          src={option.logo}
          alt=""
          className={
            option.logoBlend
              ? "h-full w-full object-contain p-1 mix-blend-lighten"
              : "object-contain"
          }
          style={
            option.logoBlend ? undefined : { width: logoSize, height: logoSize }
          }
          width={option.logoBlend ? boxSize : logoSize}
          height={option.logoBlend ? boxSize : logoSize}
        />
      </div>
      <span
        className={`font-medium text-textPrimary text-center w-full min-w-0 px-0.5 mt-1.5 tablet:mt-1.5 block leading-tight pb-0.5 text-xs tablet:text-sm whitespace-nowrap ${selected ? "border-b-2" : ""}`}
        style={selected ? { borderColor: option.color } : undefined}
      >
        {option.label}
      </span>
    </button>
  );
}
