import React, { Suspense } from 'react';
import { Loader } from './atoms';
import { ErrorsEmitterProvider } from '../contexts';
import { AppRoutes } from './routes';

export const ViewEntryPoint = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ErrorsEmitterProvider>
        <AppRoutes />
      </ErrorsEmitterProvider>
    </Suspense>
  );
};
