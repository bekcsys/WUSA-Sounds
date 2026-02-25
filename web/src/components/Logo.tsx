interface LogoProps {
  src: string;
  width: number;
  height: number;
}

export function Logo({ src, width, height }: LogoProps) {
  return (
    <div
      className="flex items-center justify-center border-2 border-transparent tablet:border-[3px] rounded-xl tablet:rounded-[20px] bg-transparent"
      style={{ width: width + 8, height: height + 8 }}
    >
      <img
        src={src}
        alt="Wellness USA"
        className="object-contain"
        style={{ width, height }}
        width={width}
        height={height}
      />
    </div>
  );
}
