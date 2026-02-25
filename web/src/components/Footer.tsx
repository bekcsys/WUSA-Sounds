export function Footer({ isTablet }: { isTablet: boolean }) {
  return (
    <footer className="w-full flex-shrink-0" style={{ height: "6%" }}>
      <div className="w-full flex flex-col items-center pt-0.5">
        <div className="w-full h-px bg-divider" />
        <div
          className={`w-full flex items-center justify-center flex-shrink-0 ${isTablet ? "py-1.5 px-4 mt-0" : "py-1 px-4 mt-[18px]"}`}
        >
          <p
            className={`text-footer ${isTablet ? "text-base" : "text-[15px]"}`}
          >
            All rights reserved, Wellness USA. © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
