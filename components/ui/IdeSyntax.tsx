import type { ReactNode } from "react";

import type { SemanticToken } from "@/data/portfolio";

/** VS Code Dark+ syntax spans */
export function Kw({ children }: { children: ReactNode }) {
  return <span className="text-ide-keyword">{children}</span>;
}

export function Ty({ children }: { children: ReactNode }) {
  return <span className="text-ide-type">{children}</span>;
}

export function Fn({ children }: { children: ReactNode }) {
  return <span className="text-ide-function">{children}</span>;
}

export function Str({ children }: { children: ReactNode }) {
  return <span className="text-ide-string">{children}</span>;
}

export function Num({ children }: { children: ReactNode }) {
  return <span className="text-ide-number">{children}</span>;
}

export function Prop({ children }: { children: ReactNode }) {
  return <span className="text-ide-property">{children}</span>;
}

export function Cmt({ children }: { children: ReactNode }) {
  return <span className="text-ide-syntax-comment">{children}</span>;
}

export function SectionHeading({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className={`font-mono text-xl font-bold text-ide-text scroll-mt-16 ${className}`.trim()}
    >
      <Cmt>{"// "}</Cmt>
      {children}
    </h2>
  );
}

export function SemanticText({
  tokens,
  className = "",
}: {
  tokens: SemanticToken[];
  className?: string;
}) {
  return (
    <span className={className}>
      {tokens.map((token, i) => {
        switch (token.kind) {
          case "fn":
            return <Fn key={i}>{token.value}</Fn>;
          case "ty":
            return <Ty key={i}>{token.value}</Ty>;
          case "num":
            return <Num key={i}>{token.value}</Num>;
          default:
            return <span key={i}>{token.value}</span>;
        }
      })}
    </span>
  );
}
