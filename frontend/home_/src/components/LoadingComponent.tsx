import { Spinner } from '@nextui-org/react';

export default function LoadingComponent({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner
        label={label || 'Loading...'}
        color="secondary"
        labelColor="secondary"
      />
    </div>
  );
}
