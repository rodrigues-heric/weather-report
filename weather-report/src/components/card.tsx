export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`border-border bg-card text-card-foreground rounded-xl border shadow-sm ${className}`}
  >
    {children}
  </div>
);
