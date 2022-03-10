import { ChainId } from '@pancakeswap-libs/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x70a1c5E86fBa8A9bBB3B829D022F0510D3FEfB88', // TODO
  [ChainId.BSCTESTNET]: '0x70a1c5E86fBa8A9bBB3B829D022F0510D3FEfB88'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
