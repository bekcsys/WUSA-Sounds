export type TabId = "sounds" | "youtube" | "spotify";

interface TabNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  className?: string;
}

const TABS: { id: TabId; label: string }[] = [
  { id: "sounds", label: "Sounds" },
  { id: "youtube", label: "YouTube" },
  { id: "spotify", label: "Spotify" },
];

export function TabNav({ activeTab, onSelectTab, className = "" }: TabNavProps) {
  return (
    <nav
      className={`flex flex-shrink-0 w-full flex-row items-center justify-center gap-0 ${className}`}
      role="tablist"
      aria-label="Content tabs"
    >
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={activeTab === id}
          aria-controls={`panel-${id}`}
          id={`tab-${id}`}
          onClick={() => onSelectTab(id)}
          className={`min-h-touch-target tablet:min-h-[48px] px-4 tablet:px-6 py-2.5 tablet:py-3 text-sm tablet:text-base font-semibold border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${
            activeTab === id
              ? "text-brand border-brand"
              : "text-textMuted border-transparent hover:text-textPrimary hover:border-navy/20"
          }`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
