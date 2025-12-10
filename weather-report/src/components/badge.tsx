export const Badge = ({
  children,
  variant = 'default',
}: {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}) => {
  const styles =
    variant === 'outline'
      ? 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground'
      : 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';

  return (
    <div
      className={`focus:ring-ring inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none ${styles}`}
    >
      {children}
    </div>
  );
};
