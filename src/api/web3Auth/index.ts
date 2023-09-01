import Web3Auth from '@web3auth/node-sdk'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { initTKey, tKey, getDeviceShareOnFirstLogin } from '../tkey'
import WebStorageModule from '@tkey/web-storage'
import ShareStore from '@tkey/common-types/dist/types/base/ShareStore'

const WEB3_AUTH_CLIENT_ID = process.env
  .NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID as string
const WEB3_AUTH_VERIFIER = process.env.NEXT_PUBLIC_WEB3_AUTH_VERIFIER as string

export const web3Auth = new Web3Auth({
  clientId: WEB3_AUTH_CLIENT_ID,
  //web3AuthNetwork: 'cyan',
  web3AuthNetwork: 'testnet',
  usePnPKey: false,
})

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    /*
      pass the chain config that you want to connect with
      all chainConfig fields are required.
      */
    chainConfig: {
      chainId: '0x1',
      rpcTarget: 'https://rpc.ankr.com/eth',
      displayName: 'mainnet',
      blockExplorer: 'https://etherscan.io/',
      ticker: 'ETH',
      tickerName: 'Ethereum',
    },
  },
})

web3Auth.init({ provider: privateKeyProvider })

export const web3AuthReconstructPrivateKey = async ({
  userUuid,
  jwt,
}: {
  userUuid: string
  jwt: string
}) => {
  const verifier = WEB3_AUTH_VERIFIER
  const verifierId = userUuid
  console.log({ userUuid, jwt })

  const OAuthShareProvider = await web3Auth.connect({
    verifier,
    verifierId,
    idToken: jwt,
  })

  const OAuthShareKey = await OAuthShareProvider?.request({
    method: 'eth_private_key',
  })

  await initTKey({ oAuthShareKey: OAuthShareKey, verifier, verifierId })

  // Try to load share from web storage
  let deviceShare = await (
    tKey.modules.webStorage as WebStorageModule
  ).getDeviceShare()
  console.log('deviceShare - previously stored on browser: ', deviceShare)
  // If device share not found, probably first time login
  if (!deviceShare) {
    // If first time login, should be able to get device share
    deviceShare = (await getDeviceShareOnFirstLogin()) as ShareStore
    console.log('deviceShare - first login: ', deviceShare)
    // Then store device share in web storage for future use
    await (tKey.modules.webStorage as WebStorageModule).storeDeviceShare(
      deviceShare
    )
  }
  // If device share is still not found. this is a new device.
  if (!deviceShare) {
    // TODO: ask user to load backup share
    throw new Error('Device share not found, backup share required')
  }

  tKey.inputShareStore(deviceShare)

  const { requiredShares } = tKey.getKeyDetails()
  if (requiredShares <= 0) {
    const reconstructedKey = await tKey.reconstructKey()
    const finalPrivateKey = reconstructedKey?.privKey.toString('hex')
    return finalPrivateKey
  }

  throw new Error('Not enough shares to reconstruct key')
}
