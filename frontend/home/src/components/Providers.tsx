import { NextUIProvider } from '@nextui-org/system';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className="z-50"
      />
      {children}
    </NextUIProvider>
  );
}
