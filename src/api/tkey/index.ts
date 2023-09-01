import ThresholdKey from '@tkey/core'
import SFAServiceProvider from '@tkey/service-provider-sfa'
import TorusServiceProvider from '@tkey/service-provider-base'
import TorusStorageLayer from '@tkey/storage-layer-torus'
import { ShareSerializationModule } from '@tkey/share-serialization'
import { WebStorageModule } from '@tkey/web-storage'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import ShareStore from '@tkey/common-types/dist/types/base/ShareStore'

const customAuthArgs = {
  baseUrl: 'http://localhost:3000/serviceworker/',
  enableLogging: true,
  network: 'testnet', // based on the verifier network.
}

// Instantiation of Service Provider
const serviceProvider = new TorusServiceProvider({
  customAuthArgs,
} as any)

// Configuration of Storage Layer
const storageLayer = new TorusStorageLayer({
  hostUrl: 'https://metadata.tor.us',
})

const chainConfig = {
  chainId: '0x1',
  rpcTarget: 'https://rpc.ankr.com/eth',
  displayName: 'mainnet',
  blockExplorer: 'https://etherscan.io/',
  ticker: 'ETH',
  tickerName: 'Ethereum',
}

// Configuration of Modules
const webStorageModule = new WebStorageModule()
const shareSerializationModule = new ShareSerializationModule()

// Instantiation of tKey
export const tKey = new ThresholdKey({
  serviceProvider,
  storageLayer,
  modules: {
    shareSerialization: shareSerializationModule,
    webStorage: webStorageModule,
  },
})

export const ethereumPrivateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig,
  },
})

export const initTKey = async ({
  oAuthShareKey,
  verifier,
  verifierId,
}: {
  oAuthShareKey: unknown
  verifier: string
  verifierId: string
}) => {
  tKey.serviceProvider.postboxKey = oAuthShareKey as any
  ;(tKey.serviceProvider as any).verifierName = verifier
  ;(tKey.serviceProvider as any).verifierId = verifierId

  await tKey.initialize().catch((err) => {
    console.error('initializeTKey() tKey.initialize error: ', err)
    throw err
  })
}

export const getShareIndexes = async () => {
  if (!tKey) {
    throw new Error('tKey is not initialized')
  }

  const metadata = tKey.getMetadata()
  const latestPolynomial = metadata.getLatestPublicPolynomial()
  const latestPolynomialId = latestPolynomial.getPolynomialID()
  const indexes = metadata.getShareIndexesForPolynomial(latestPolynomialId)

  return indexes
}

export const getSerializedShareByIndex = async (index: string) => {
  if (!tKey) {
    throw new Error('tKey is not initialized')
  }
  const shareStore = tKey.outputShareStore(index)
  const serializedShare = await (
    tKey.modules.shareSerialization as any
  ).serialize(shareStore.share.share, 'mnemonic')

  return serializedShare
}

export const serializeShare = async (shareStore: ShareStore) => {
  return await (tKey.modules.shareSerialization as any).serialize(
    shareStore.share.share,
    'mnemonic'
  )
}

export const loadSerializedShare = async (serializedShare: string) => {
  const deserializedShare = await (
    tKey.modules.shareSerialization as any
  ).deserialize(serializedShare, 'mnemonic')
  await tKey.inputShare(deserializedShare)
}

/**
 * @description This function is used to get the device share on first login
 *   @returns {string} The device sharea as a serialized mnemonic
 * */
export const getDeviceShareOnFirstLogin =
  async (): Promise<ShareStore | null> => {
    if (!tKey) {
      throw new Error('tKey is not initialized')
    }

    const indexes = await getShareIndexes()
    const deviceShareIndex = indexes[1]

    let shareStore: ShareStore | undefined
    try {
      shareStore = tKey.outputShareStore(deviceShareIndex)
      return shareStore
    } catch (err) {
      console.warn('Device share from tKey not found. err', err)
      return null
    }
  }

export const generateNewShare = async () => {
  if (!tKey) {
    throw new Error('tKey is not initialized')
  }

  const newShare = await tKey.generateNewShare()
  const shareStore =
    newShare.newShareStores[newShare.newShareIndex.toString('hex')]

  const serializedShare = await (
    tKey.modules.shareSerialization as any
  ).serialize(shareStore.share.share, 'mnemonic')

  return serializedShare
}

export const deleteShareByIndex = async (index: string) => {
  if (!tKey) {
    throw new Error('tKey is not initialized')
  }
  const shareStore = await tKey.deleteShare(index)

  console.log({ shareStore })
}
