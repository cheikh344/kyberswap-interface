import {
  CrossChainLocators,
  HeaderLocators,
  LimitOrderLocators,
  NetworkLocators,
  SwapPageLocators,
  TokenCatalogLocators,
  WalletLocators,
} from '../selectors/selectors.cy'

export const NETWORK = Cypress.env('NETWORK')

export interface myCallbackType<T> {
  (myArgument: T): void
}

export const SwapPage = {
  open(url: string) {
    cy.visit('/' + url)
    cy.url().should('include', url)
    cy.closeTutorialPopup()
  },

  selectTokenIn(): TokenCatalog {
    cy.selectToken(SwapPageLocators.dropdownTokenIn)
    return new TokenCatalog()
  },
  selectTokenOut(): TokenCatalog {
    cy.selectToken(SwapPageLocators.dropdownTokenOut)
    return new TokenCatalog()
  },

  getCurrentTokenIn(text: myCallbackType<string>) {
    cy.getContent(SwapPageLocators.dropdownTokenIn, text)
  },

  getCurrentTokenOut(text: myCallbackType<string>) {
    cy.getContent(SwapPageLocators.dropdownTokenOut, text)
  },

  connectWallet() {
    cy.get(WalletLocators.btnConnectWallet).should('be.visible').click()
    cy.connectWallet()
  },

  getStatusConnectedWallet() {
    cy.get(WalletLocators.statusConnected, { timeout: 10000 }).should('be.visible')
  },

  goToLimitOrder() {
    cy.get(LimitOrderLocators.btnLimit).click()
  },

  goToCrossChain() {
    cy.get(CrossChainLocators.btnCrossChain).click()
  },

  goToFarmPage() {
    cy.get(HeaderLocators.dropdownEarn).click({ force: true })
    cy.get(HeaderLocators.lblFarms).click({ force: true })
  },

  goToPoolPage() {
    cy.get(HeaderLocators.dropdownEarn).click({ force: true })
    cy.get(HeaderLocators.lblPools).click({ force: true })
  },

  goToMyPoolsPage() {
    cy.get(HeaderLocators.dropdownEarn).click({ force: true })
    cy.get(HeaderLocators.lblMyPools).click({ force: true })
  },
}

export class Network {
  selectNetwork(network: string) {
    cy.get(NetworkLocators.btnSelectNetwork, { timeout: 30000 }).should('be.visible').click()
    cy.get(NetworkLocators.btnNetwork).contains(network).click({ force: true })
  }
}

export class TokenCatalog {
  searchToken(value: string) {
    cy.searchToken(value)
  }

  selectImportTab() {
    cy.selectImportTab()
  }

  selectFavoriteToken(tokenSymbol: string) {
    cy.selectFavoriteToken(tokenSymbol)
  }

  selectTokenBySymbol(tokenSymbol: string) {
    this.searchToken(tokenSymbol)
    cy.selectTokenBySymbol(tokenSymbol)
  }

  addFavoriteToken(tokenSymbol: Array<string>) {
    tokenSymbol.forEach(element => {
      this.searchToken(element)
      cy.wait(2000)
      cy.addFavoriteToken()
    })
  }

  removeFavoriteToken(tokenSymbol: string) {
    cy.removeFavoriteToken(tokenSymbol)
  }

  importNewTokens(address: Array<string>) {
    address.forEach(element => {
      SwapPage.selectTokenIn()
      cy.importNewToken(element)
    })
  }

  deleteImportedToken(value: string) {
    cy.deleteImportedToken(value)
  }

  clearAllImportedTokens() {
    cy.clearAllImportedTokens()
  }

  getFavoriteTokens(list: myCallbackType<string[]>) {
    cy.getList(TokenCatalogLocators.lblFavoriteToken, list)
  }

  getWhitelistTokens(list: myCallbackType<string[]>) {
    cy.getList(TokenCatalogLocators.lblTokenSymbol, list)
  }

  getNoResultsFound(text: myCallbackType<string>) {
    cy.getContent(TokenCatalogLocators.lblNotFound, text)
  }

  closePopup() {
    cy.get(TokenCatalogLocators.iconClosePopup).click()
  }
}
