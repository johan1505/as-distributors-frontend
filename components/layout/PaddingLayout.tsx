interface PaddingLayoutProps {
  children: React.ReactNode;
}

export function PaddingLayout({ children }: PaddingLayoutProps) {
  return (
    <div className="max-w-7xl m-auto px-8 h-full flex justify-center py-8">
      {children}
    </div>
  );
}
