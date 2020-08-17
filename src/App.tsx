import React from 'react';
import Routes from  './routes/Routes';
import { SnackbarProvider } from 'notistack';

const App: React.FC = () => {
  return (
    <SnackbarProvider>
      <Routes />
    </SnackbarProvider>
  );
}

export default App;
