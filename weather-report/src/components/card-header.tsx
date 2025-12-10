export const CardHeader = ({
  title,
  icon,
  subtitle,
}: {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
}) => (
  <div className='flex flex-col space-y-1.5 p-6 pb-2'>
    <div className='flex items-center justify-between'>
      <h3 className='flex items-center gap-2 text-lg leading-none font-semibold tracking-tight'>
        {icon && <span className='text-muted-foreground'>{icon}</span>}
        {title}
      </h3>
    </div>
    {subtitle && <p className='text-muted-foreground text-sm'>{subtitle}</p>}
  </div>
);
