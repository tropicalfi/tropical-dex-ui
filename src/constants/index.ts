import { ChainId, JSBI, Percent, Token, WETH } from '@pancakeswap-libs/sdk'
import priceContracts from './goldPriceContracts'

export const ROUTER_ADDRESS = '0xf6aA8520cE2f044f5868d103dfC3b92Eb1B51eC3'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAIQUIRIOLD = new Token(ChainId.MAINNET, '0x79e24a6c18491109C7DBEf5e01E41478E9EbDd78', 18, 'DAIQUIRI', 'Tropical Finance Token')
export const DAIQUIRI = new Token(ChainId.MAINNET, priceContracts.cakeAddress, 18, 'DAIQUIRI', 'Tropical Finance Token')
export const FLEXUSD = new Token(ChainId.MAINNET, priceContracts.busdAddress, 18, 'FLEXUSD', 'FLEX USD')
export const BPAD = new Token(ChainId.MAINNET, '0x9192940099fDB2338B928DE2cad9Cd1525fEa881', 18, 'BPAD', 'BCHPad')
export const WBCH = new Token(ChainId.MAINNET, '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04', 18, 'WBCH', 'Wrapped BCH')
export const FATCAT = new Token(ChainId.MAINNET, '0xF4b10fcC5C22C9E6746a8f4DAc07A59e79ef947A', 18, 'FATCAT', 'FatCats')
export const LAW = new Token(ChainId.MAINNET, '0x0b00366fBF7037E9d75E4A569ab27dAB84759302', 18, 'LAW', 'LAW')
export const DAO = new Token(ChainId.MAINNET, '0xca0235058985fcc1839e9e37c10900a73c126708', 7, "DAO", "DAO")
export const CLY = new Token(ChainId.MAINNET, '0x7642Df81b5BEAeEb331cc5A104bd13Ba68c34B91', 18, "CLY", "CLY")


const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.BSCTESTNET]: [WETH[ChainId.MAINNET]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAIQUIRI, DAIQUIRIOLD, FLEXUSD, BPAD, WBCH, FATCAT, LAW, DAO, CLY],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.MAINNET], DAIQUIRI, DAIQUIRIOLD, FLEXUSD, BPAD, WBCH, FATCAT, LAW, DAO, CLY],
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [DAIQUIRI.address]: [WETH[ChainId.MAINNET], DAIQUIRIOLD, FLEXUSD, BPAD, LAW, FATCAT, DAO, CLY]
  },
  [ChainId.MAINNET]: {
    [DAIQUIRI.address]: [WETH[ChainId.MAINNET], DAIQUIRIOLD, FLEXUSD, BPAD, LAW, FATCAT, DAO, CLY]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAIQUIRI, DAIQUIRIOLD, FLEXUSD, BPAD, WBCH, LAW, FATCAT, DAO, CLY],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.MAINNET], DAIQUIRI, DAIQUIRIOLD, FLEXUSD, BPAD, WBCH, LAW, FATCAT, DAO, CLY],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAIQUIRI, DAIQUIRIOLD, FLEXUSD, BPAD, WBCH, LAW, FATCAT, DAO, CLY],
  [ChainId.BSCTESTNET]: [...WETH_ONLY[ChainId.MAINNET], DAIQUIRI, DAIQUIRIOLD, FLEXUSD, BPAD, WBCH, LAW, FATCAT, DAO, CLY],
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      DAIQUIRI,
      WBCH
    ],
    [
      DAIQUIRIOLD,
      WBCH
    ],
    [DAIQUIRI, FLEXUSD],
    [DAIQUIRIOLD, FLEXUSD],
    [DAIQUIRI, BPAD],
    [DAIQUIRIOLD, BPAD],
    [DAIQUIRI, FATCAT],
    [WBCH, FLEXUSD],
    [DAIQUIRI, DAO],
    [CLY, WBCH]
  ],
  [ChainId.MAINNET]: [
    [
      DAIQUIRI,
      WBCH
    ],
    [
      DAIQUIRIOLD,
      WBCH
    ],
    [DAIQUIRI, FLEXUSD],
    [DAIQUIRIOLD, FLEXUSD],
    [DAIQUIRI, BPAD],
    [DAIQUIRI, FATCAT],
    [DAIQUIRIOLD, BPAD],
    [WBCH, FLEXUSD],
    [DAIQUIRI, DAO],
    [CLY, WBCH]
  ],
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 80
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
