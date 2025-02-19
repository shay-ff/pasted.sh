interface CardProps {
    className?: string;
    children: React.ReactNode;
  }
  
  export function Card({ className = "", children }: CardProps) {
    return (
      <div className={`shadow-lg p-4 rounded-lg bg-white ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ className = "", children }: CardProps) {
    return <div className={`p-2 ${className}`}>{children}</div>;
  }