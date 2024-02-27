import { LOCALE } from "@config";

interface DatetimeProps {
  pubDate: Date;
  modDate: Date | undefined | null;
}

interface Props extends DatetimeProps {
  size?: "sm" | "lg";
  className?: string;
  showIcon?: boolean;
}

export default function Datetime({
  pubDate,
  modDate,
  size = "sm",
  className = "",
  showIcon = false,
}: Props) {
  return (
    <div className={`flex items-center space-x-2 opacity-80 ${className}`}>
      {showIcon && (
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
      )}
      {modDate && modDate > pubDate ? (
        <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
          Updated:
        </span>
      ) : (
        <span className="sr-only">Published:</span>
      )}
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        <FormattedDatetime pubDate={pubDate} modDate={modDate} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDate, modDate }: DatetimeProps) => {
  const myDatetime = new Date(modDate && modDate > pubDate ? modDate : pubDate);

  const date = myDatetime.toLocaleDateString(LOCALE.langTag);

  const time = myDatetime.toLocaleTimeString(LOCALE.langTag);

  return (
    <>
      <time dateTime={myDatetime.toISOString()}>{date}</time>
      <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      <span className="text-nowrap">{time}</span>
    </>
  );
};
