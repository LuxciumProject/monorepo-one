import { NextUIProvider } from '@nextui-org/system';

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
