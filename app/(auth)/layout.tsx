export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col ">
      <div className="flex justify-center items-center h-full">{children}</div>
    </div>
  );
}
