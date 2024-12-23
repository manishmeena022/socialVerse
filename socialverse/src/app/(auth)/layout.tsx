export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center w-full max-w-md  px-4 py-8 bg-white shadow-lg sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
