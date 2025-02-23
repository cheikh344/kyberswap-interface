export const TokenCatalogLocators = {
  dropdownTokenIn: '[data-testid=swap-currency-input] [data-testid=token-symbol-container]',
  dropdownTokenOut: '[data-testid=swap-currency-output] [data-testid=token-symbol-container]',
  txtToken: '[data-testid=token-search-input]',
  lblFavoriteToken: '[data-testid=favorite-token]',
  lblRowInWhiteList: '[data-testid=token-item]',
  lblTokenSymbol: '[data-testid=token-symbol]',
  lblNotFound: '[data-testid=no-token-result]',
  iconFavorite: '[data-testid=button-favorite-token]',
  iconRemoveImportedToken: '[data-testid=button-remove-import-token]',
  iconRemoveFavoriteToken: '[data-testid=close-btn]',
  iconClosePopup: '[data-testid=close-icon]',
  btnImport: '[data-testid=button-import-token]',
  btnUnderstand: '[data-testid=button-confirm-import-token]',
  btnClearAll: '[data-testid=button-clear-all-import-token]',
  btnAllTab: '[data-testid=tab-all]',
  btnImportTab: '[data-testid=tab-import]',
}

export const SwapPageLocators = {
  dropdownTokenIn: '[data-testid=swap-currency-input] [data-testid=token-symbol-container]',
  dropdownTokenOut: '[data-testid=swap-currency-output] [data-testid=token-symbol-container]',
  btnSkipTutorial: '[data-testid=button-skip-tutorial]',
}

export const LimitOrderLocators = {
  txtTokenSellAmount: '[data-testid=limit-order-input-tokena] [data-testid=token-amount-input]',
  dropdownTokenSell: '[data-testid=limit-order-input-tokena] [data-testid=token-symbol-container]',
  dropdownTokenBuy: '[data-testid=limit-order-input-tokenb] [data-testid=token-symbol-container]',
  btnLimit: '[data-testid=limit-button]',
  txtSellingRate: '[data-testid=input-selling-rate]',
  lblBalanceIn: '[data-testid=limit-order-input-tokena] [data-testid=balance]',
  lblErrorMessage: '[data-testid=error-message]',
  btnGetStarted: '[data-testid=get-started-button]',
}

export const CrossChainLocators = {
  btnCrossChain: '[data-testid=cross-chain-tab]',
  btnNetworkIn: '[data-testid=swap-currency-input] [data-testid=network-button]',
  btnNetworkOut: '[data-testid=swap-currency-output] [data-testid=network-button]',
  btnUnderstand: '[data-testid=understand-button]',
  rechartsSurface: '.recharts-surface', //it's in the library so don't use data-testid
}

export const WalletLocators = {
  btnConnectWallet: '[data-testid=button-connect-wallet]',
  btnMetaMask: '[data-testid=connect-METAMASK]',
  chkAcceptTerm: '[data-testid=accept-term]',
  statusConnected: '[data-testid=web3-status-connected]',
}

export const NetworkLocators = {
  btnSelectNetwork: '[data-testid=select-network]',
  btnNetwork: '[data-testid=network-list]',
}

export const HeaderLocators = {
  dropdownEarn: '[data-testid=earn-menu]',
  lblPools: '[data-testid=pools-nav-link]',
  lblMyPools: '[data-testid=my-pools-nav-link]',
  lblFarms: '[data-testid=farms-nav-link]',
}

export const FarmLocators = {
  lblApr: '[data-testid=apr-value]',
  lblTvl: '[data-testid=tvl-value]',
}

export const PoolLocators = {
  txtSearchPool: 'input[data-testid="search-pool"]',
  txtPriceValue: 'input[data-testid="price-value"]',
  txtAmountIn: '[data-testid="token-amount-input"]',
  lblCurrentPrice: '[data-testid="current-price"]',
  btnZapIn: '[data-testid="zap-in-btn"]',
}
