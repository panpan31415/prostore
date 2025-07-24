export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
        <text>this is root</text>
      <main className="flex-1  wrap-normal"> {children}</main>
    </div>
  );
}
