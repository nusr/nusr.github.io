import { LOCALE } from "@config";

interface FormatDateProps {
  pubDate: Date;
  modDate: Date | undefined | null;
}

interface Props extends FormatDateProps {
  size?: "sm" | "lg";
  className?: string;
}

export default function FormatDate({
  pubDate,
  modDate,
  size = "sm",
  className = "",
}: Props) {
  const isMod = modDate && modDate > pubDate;
  const realDate = isMod ? modDate : pubDate;
  return (
    <div
      className={`flex items-center space-x-2 opacity-80 ${size === "sm" ? "text-sm" : "text-base"}  ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
      >
        <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z"></path>
        <path d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z"></path>
      </svg>
      <span> {isMod ? "Updated:" : "Published:"}</span>
      <time dateTime={realDate.toISOString()}>
        {realDate.toLocaleDateString(LOCALE.langTag)}
      </time>
    </div>
  );
}
