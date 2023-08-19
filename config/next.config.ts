import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants'

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase: string) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    RESTURL_SPEAKERS: (() => {
      if (isDev) {
        return 'https://vaults-backend-production-2c7b.up.railway.app/'
      }
      if (isProd) {
        return ''
      }
      if (isStaging) {
        return 'https://google.com'
      }
      return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
    RESTURL_SESSIONS: (() => {
      if (isDev) {
        return 'https://vaults-backend-production-2c7b.up.railway.app/'
      }
      if (isProd) {
        return ''
      }
      if (isStaging) {
        return 'https://google.com'
      }
      return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }

  return {
    env,
  }
}
