import "./globals.css";

export const metadata = {
  title: "Calculadora EPC Michael y Nandy",
  description: "Calculadora interna de EPC y comisión Sunrun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
