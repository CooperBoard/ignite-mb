export const metadata = {
  title: 'Ignite Church of Myrtle Beach',
  description: 'Ignite MB is a place where people can meet Jesus, engage in life-giving community, and everyone is welcome.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
