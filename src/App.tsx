// import React from 'react';
// import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
// import { getFullnodeUrl } from '@mysten/sui/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import '@mysten/dapp-kit/dist/index.css';
// import './App.css';
// import MainApp from './components/MainApp';

// // Config options for the networks you want to connect to
// const { networkConfig } = createNetworkConfig({
//   localnet: { url: getFullnodeUrl('localnet') },
//   testnet: { url: getFullnodeUrl('testnet') },
//   mainnet: { url: getFullnodeUrl('mainnet') },
// });

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
//         <WalletProvider>
//           <div className="App">
//             <MainApp />
//           </div>
//         </WalletProvider>
//       </SuiClientProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;





import React from 'react';
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
import './App.css';
import MainApp from './components/MainApp';

// If createNetworkConfig expects no arguments, use this:
const networkConfig = {
  localnet: { url: getFullnodeUrl('localnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider>
          <div className="App">
            <MainApp />
          </div>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}

export default App;