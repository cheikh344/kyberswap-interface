import { ChainId, NativeCurrency, Token, WETH } from '@kyberswap/ks-sdk-core'

import { CHAINS_SUPPORT_FEE_CONFIGS, ETHER_ADDRESS } from './index'
import { NETWORKS_INFO, SUPPORTED_NETWORKS } from './networks'

const NativeCurrenciesLocal: { [chainId in ChainId]: NativeCurrency } = SUPPORTED_NETWORKS.reduce(
  (acc, chainId) => ({
    ...acc,
    [chainId]: new NativeCurrency(
      chainId,
      NETWORKS_INFO[chainId].nativeToken.decimal,
      NETWORKS_INFO[chainId].nativeToken.symbol,
      NETWORKS_INFO[chainId].nativeToken.name,
    ),
  }),
  {},
) as { [chainId in ChainId]: NativeCurrency }

//this Proxy helps fallback undefined ChainId by Ethereum info
export const NativeCurrencies = new Proxy(NativeCurrenciesLocal, {
  get(target, p) {
    const prop = p as any as ChainId
    if (p && target[prop]) return target[prop]
    return target[ChainId.MAINNET]
  },
})

// This list is intentionally different from the list above
// Was requested from product team, to implement Swap fee config
export const STABLE_COIN_ADDRESSES_TO_TAKE_FEE: Record<ChainId, string[]> = {
  [ChainId.AURORA]: [
    '0xB12BFcA5A55806AaF64E99521918A4bf0fC40802', // usdc
    '0x4988a896b1227218e4A686fdE5EabdcAbd91571f', // usdt
    '0xe3520349F477A5F6EB06107066048508498A291b', // Dai
  ],
  [ChainId.CRONOS]: [
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', // usdc
    '0xF2001B145b43032AAF5Ee2884e456CCd805F677D', // dai
    '0x66e428c3f67a68878562e79A0234c1F83c208770', // usdt
    '0xC74D59A548ecf7fc1754bb7810D716E9Ac3e3AE5', // busd
    '0x2Ae35c8E3D4bD57e8898FF7cd2bBff87166EF8cb', // MAI
  ],
  [ChainId.ZKSYNC]: [],
  [ChainId.BTTC]: [],
  [ChainId.MATIC]: [],
  [ChainId.OPTIMISM]: [],
  [ChainId.SOLANA]: [],
  [ChainId.GÖRLI]: [],
  [ChainId.MUMBAI]: [],
  [ChainId.BSCTESTNET]: [],
  [ChainId.AVAXTESTNET]: [],
  [ChainId.MAINNET]: [],
  [ChainId.AVAXMAINNET]: [],
  [ChainId.FANTOM]: [],
  [ChainId.BSCMAINNET]: [],
  [ChainId.ARBITRUM]: [],
  [ChainId.ZKEVM]: [],
  [ChainId.LINEA]: [],
  [ChainId.BASE]: [],
  [ChainId.SCROLL]: [],
  [ChainId.SOLANA_DEVNET]: [],
}

// This is basically the same as STABLE_COIN_ADDRESSES_TO_TAKE_FEE,
// but with native token address and wrapped native token address
export const TOKENS_WITH_FEE_TIER_1: Record<ChainId, string[]> = CHAINS_SUPPORT_FEE_CONFIGS.reduce((acc, chainId) => {
  if (STABLE_COIN_ADDRESSES_TO_TAKE_FEE[chainId].length) {
    acc[chainId] = [...STABLE_COIN_ADDRESSES_TO_TAKE_FEE[chainId], ETHER_ADDRESS, WETH[chainId].address]
  } else {
    acc[chainId] = []
  }
  return acc
}, {} as Record<ChainId, string[]>)

export const SUPER_STABLE_COINS_ADDRESS: { [chainId in ChainId]: string[] } = {
  [ChainId.MAINNET]: [
    '0x6B175474E89094C44Da98b954EedeAC495271d0F', // DAI
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', // USDC
    '0xdAC17F958D2ee523a2206206994597C13D831ec7', // USDT
  ],
  [ChainId.MATIC]: [
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // DAI
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // usdc
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', // usdt
  ],
  [ChainId.BSCMAINNET]: [
    '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', // dai
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', // usdc
    '0x55d398326f99059fF775485246999027B3197955', // usdt
    '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // busd
  ],
  [ChainId.AVAXMAINNET]: [
    '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7', // USDt
    '0xc7198437980c041c805A1EDcbA50c1Ce5db95118', // usdt.e
    '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664', // usdc.e
    '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E', // usdc
    '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70', // dai.e
  ],
  [ChainId.FANTOM]: [
    '0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', // dai
    '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', // usdc
    '0x049d68029688eAbF473097a2fC38ef61633A3C7A', // fusdt
  ],
  [ChainId.CRONOS]: [
    '0xF2001B145b43032AAF5Ee2884e456CCd805F677D', // dai
    '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', // usdc
    '0x66e428c3f67a68878562e79A0234c1F83c208770', // usdt
    '0xC74D59A548ecf7fc1754bb7810D716E9Ac3e3AE5', // busd
  ],
  [ChainId.ARBITRUM]: [
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // dai
    '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', // usdc
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', // usdt
  ],
  [ChainId.BTTC]: [
    '0x9B5F27f6ea9bBD753ce3793a07CbA3C74644330d', // usdt_b
    '0xCa424b845497f7204D9301bd13Ff87C0E2e86FCF', // usdc_b
    '0x17F235FD5974318E4E2a5e37919a209f7c37A6d1', // usdd_t
    '0x935faA2FCec6Ab81265B301a30467Bbc804b43d3', // usdc_t

    '0xdB28719F7f938507dBfe4f0eAe55668903D34a15', // usdt_t
    '0xE887512ab8BC60BcC9224e1c3b5Be68E26048B8B', // usdt_e
    '0xAE17940943BA9440540940DB0F1877f101D39e8b', // usdc_e
  ],
  [ChainId.AURORA]: [
    '0xe3520349F477A5F6EB06107066048508498A291b', // Dai
    '0xB12BFcA5A55806AaF64E99521918A4bf0fC40802', // usdc
    '0x4988a896b1227218e4A686fdE5EabdcAbd91571f', // usdt
  ],
  [ChainId.OPTIMISM]: [
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1', // Dai
    '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58', // usdt
    '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', // usdc
  ],
  [ChainId.SOLANA]: [
    'EjmyN6qEC1Tf1JxiG1ae7UTJhUxSwk1TCWNWqxWV4J6o', // Dai
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // usdc
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', // usdt
  ],
  [ChainId.ZKSYNC]: [],
  [ChainId.GÖRLI]: [],
  [ChainId.MUMBAI]: [],
  [ChainId.BSCTESTNET]: [],
  [ChainId.AVAXTESTNET]: [],
  [ChainId.ZKEVM]: [
    '0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035', // USDC
    '0x1E4a5963aBFD975d8c9021ce480b42188849D41d', // USDT
    '0xC5015b9d9161Dca7e18e32f6f25C4aD850731Fd4', // DAI
  ],
  [ChainId.BASE]: [
    '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', // USDbC
    '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb', // DAI
  ],
  [ChainId.LINEA]: [],
  [ChainId.SCROLL]: [],
  [ChainId.SOLANA_DEVNET]: [],
}

export const CORRELATED_COINS_ADDRESS: { [chainId in ChainId]: string[][] } = {
  [ChainId.MAINNET]: [
    [
      '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0', //MATIC
      '0x9ee91F9f426fA633d227f7a9b000E28b9dfd8599', //stMATIC
    ],
    [
      '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //WETH
      '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84', //stETH
      '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0', //wstETH
    ],
    [
      '0xdd974D5C2e2928deA5F71b9825b8b646686BD200', //KNCL
      '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202', //KNC
    ],
  ],
  [ChainId.MATIC]: [
    [
      '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', //WMATIC
      '0x3A58a54C066FdC0f2D55FC9C89F0415C92eBf3C4', //stMATIC
      '0x0000000000000000000000000000000000001010', //MATIC
    ],
  ],
  [ChainId.BSCMAINNET]: [],
  [ChainId.AVAXMAINNET]: [
    [
      '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', //WAVAX
      '0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE', //sAVAX
    ],
  ],
  // TODO: fill here
  [ChainId.ZKSYNC]: [],
  [ChainId.FANTOM]: [],
  [ChainId.CRONOS]: [],
  [ChainId.ARBITRUM]: [],
  [ChainId.BTTC]: [],
  [ChainId.AURORA]: [],
  [ChainId.OPTIMISM]: [],
  [ChainId.SOLANA]: [],
  [ChainId.GÖRLI]: [],
  [ChainId.MUMBAI]: [],
  [ChainId.BSCTESTNET]: [],
  [ChainId.AVAXTESTNET]: [],
  [ChainId.ZKEVM]: [],
  [ChainId.LINEA]: [],
  [ChainId.BASE]: [],
  [ChainId.SCROLL]: [],
  [ChainId.SOLANA_DEVNET]: [],
}

export const KNC_ADDRESS = '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202'
export const KNCL_ADDRESS = '0xdd974D5C2e2928deA5F71b9825b8b646686BD200'

// todo: make it nullable
export const KNC: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, KNC_ADDRESS, 18, 'KNC', 'KNC'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0xd19e5119Efc73FeA1e70f9fbbc105DaB89D914e4', 18, 'KNC', 'KNC'),
  [ChainId.MATIC]: new Token(ChainId.MATIC, '0x1C954E8fe737F99f68Fa1CCda3e51ebDB291948C', 18, 'KNC', 'KNC'),
  [ChainId.BSCTESTNET]: new Token(ChainId.BSCTESTNET, '0x51E8D106C646cA58Caf32A47812e95887C071a62', 18, 'KNC', 'KNC'),
  [ChainId.BSCMAINNET]: new Token(ChainId.BSCMAINNET, '0xfe56d5892BDffC7BF58f2E84BE1b2C32D21C308b', 18, 'KNC', 'KNC'),
  [ChainId.AVAXMAINNET]: new Token(ChainId.AVAXMAINNET, '0x39fC9e94Caeacb435842FADeDeCB783589F50f5f', 18, 'KNC', 'KNC'),
  [ChainId.BTTC]: new Token(ChainId.BTTC, '0x18fA72e0EE4C580a129b0CE5bD0694d716C7443E', 18, 'KNC_b', 'KNC v2 - BSC'),
  [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, '0xe4DDDfe67E7164b0FE14E218d80dC4C08eDC01cB', 18, 'KNC', 'KNC'),
  [ChainId.OPTIMISM]: new Token(ChainId.OPTIMISM, '0xa00e3a3511aac35ca78530c85007afcd31753819', 18, 'KNC', 'KNC'),
  [ChainId.LINEA]: new Token(ChainId.LINEA, '0x3b2F62d42DB19B30588648bf1c184865D4C3B1D6', 18, 'KNC', 'KNC'),
  [ChainId.ZKEVM]: new Token(ChainId.ZKEVM, '0x6A80A465409ce8D36C513129C0FEEa61BEd579ba', 18, 'KNC', 'KNC'),
  [ChainId.BASE]: new Token(ChainId.BASE, '0x28fe69Ff6864C1C218878BDCA01482D36B9D57b1', 18, 'KNC', 'KNC'),

  // TODO(viet-nv): KNC does not exist on the below chain
  [ChainId.CRONOS]: new Token(ChainId.CRONOS, KNC_ADDRESS, 18, 'KNC', 'KNC'),
  [ChainId.AURORA]: new Token(ChainId.AURORA, KNC_ADDRESS, 18, 'KNC', 'KNC'),
  [ChainId.FANTOM]: new Token(ChainId.FANTOM, KNC_ADDRESS, 18, 'KNC', 'KNC'),
  [ChainId.SCROLL]: new Token(ChainId.SCROLL, KNC_ADDRESS, 18, 'KNC', 'KNC'),
  [ChainId.ZKSYNC]: new Token(ChainId.ZKSYNC, KNC_ADDRESS, 18, 'KNC', 'KNC'),

  [ChainId.AVAXTESTNET]: new Token(ChainId.AVAXTESTNET, KNC_ADDRESS, 18, 'KNC', 'KNC'),
  [ChainId.MUMBAI]: new Token(ChainId.MUMBAI, '0xFD1f9381Cb641Dc76Fe8087dbcf8ea84a2c77cbE', 18, 'KNC', 'KNC'),

  [ChainId.SOLANA]: new Token(ChainId.SOLANA, 'KNCkfGAnBUvoG5EJipAzSBjjaF8iNL4ivYsBS14DKdg', 18, 'KNC', 'KNC'), // todo: not exists yet
  [ChainId.SOLANA_DEVNET]: new Token(
    ChainId.SOLANA_DEVNET,
    'KNCkfGAnBUvoG5EJipAzSBjjaF8iNL4ivYsBS14DKdg',
    18,
    'KNC',
    'KNC',
  ),
}

export const DEFAULT_OUTPUT_TOKEN_BY_CHAIN: Partial<Record<ChainId, Token>> = {
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD'),
  [ChainId.MATIC]: new Token(ChainId.MATIC, '0xc2132D05D31c914a87C6611C10748AEb04B58e8F', 6, 'USDT', 'Tether USD'),
  [ChainId.BSCMAINNET]: new Token(ChainId.BSCMAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'BUSD'),
  [ChainId.AVAXMAINNET]: new Token(
    ChainId.AVAXMAINNET,
    '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    6,
    'USDC.e',
    'USDC.e',
  ),
  [ChainId.FANTOM]: new Token(ChainId.FANTOM, '0x28a92dde19D9989F39A49905d7C9C2FAc7799bDf', 6, 'USDC', 'USD Coin'),
  [ChainId.CRONOS]: new Token(ChainId.CRONOS, '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59', 6, 'USDC', 'USD Coin'),
  [ChainId.ARBITRUM]: new Token(ChainId.ARBITRUM, '0x912CE59144191C1204E64559FE8253a0e49E6548', 18, 'ARB', 'Arbitrum'),
  [ChainId.OPTIMISM]: new Token(ChainId.OPTIMISM, '0x7F5c764cBc14f9669B88837ca1490cCa17c31607', 6, 'USDC', 'USD Coin'),
  [ChainId.AURORA]: new Token(ChainId.AURORA, '0xB12BFcA5A55806AaF64E99521918A4bf0fC40802', 6, 'USDC', 'USD Coin'),
  [ChainId.BTTC]: new Token(ChainId.BTTC, '0x9B5F27f6ea9bBD753ce3793a07CbA3C74644330d', 18, 'USDT_b', 'Tether USD_BSC'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, '0x2bf64acf7ead856209749d0d125e9ade2d908e7f', 18, 'USDT', 'Tether USD'),
  [ChainId.ZKSYNC]: new Token(ChainId.ZKSYNC, '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4', 6, 'USDC', 'USD Coin'),
  [ChainId.ZKEVM]: new Token(ChainId.ZKEVM, '0x1E4a5963aBFD975d8c9021ce480b42188849D41d', 6, 'USDT', 'Tether USD'),
  [ChainId.LINEA]: new Token(ChainId.LINEA, '0x176211869cA2b568f2A7D4EE941E073a821EE1ff', 6, 'USDC', 'USD Coin'),
  [ChainId.BASE]: new Token(ChainId.BASE, '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA', 6, 'USDC', 'USD Coin'),
  [ChainId.SCROLL]: new Token(ChainId.SCROLL, '0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df', 6, 'USDT', 'Tether USD'),
  [ChainId.SOLANA]: new Token(ChainId.SOLANA, 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 6, 'USDC', 'USD Coin'),
}

export const DEFAULT_SWAP_FEE_STABLE_PAIRS = 4
export const DEFAULT_SWAP_FEE_NOT_STABLE_PAIRS = 10

export const mKNC: { [chain in ChainId]?: string } = {
  [ChainId.ARBITRUM]: '0x316772cFEc9A3E976FDE42C3Ba21F5A13aAaFf12',
  [ChainId.AVAXMAINNET]: '0x39fC9e94Caeacb435842FADeDeCB783589F50f5f',
  [ChainId.OPTIMISM]: '0x4518231a8FDF6ac553B9BBD51Bbb86825B583263',
  [ChainId.FANTOM]: '0x1e1085eFaA63EDFE74aaD7C05a28EAE4ef917C3F',
}
