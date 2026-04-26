import clsx from "../lib/clsx";

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
};

export default function GlitchText({ children, className, as: Tag = "span" }: Props) {
  return (
    <Tag
      data-text={children}
      className={clsx(
        "glitch heading-display inline-block",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
