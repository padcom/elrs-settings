export type UID = number[]

export interface BuildOptions {
  customised?: boolean
  'wifi-on-interval': number
  'tlm-interval': number
  'fan-runtime': number
  'unlock-higher-power': boolean
  'airport-uart-baud': number
  'is-airport': boolean
  'domain': number
  'flash-discriminator': number
}

export interface RuntimeOptions {
  'uid': UID
  'ssid': string
  'mode': string
  'product_name': string
  'lua_name': string
  'reg_domain': string
  'has-highpower': boolean
  'uidtype': string
}

export interface Config {
  'options': BuildOptions
  'config': RuntimeOptions
}

export interface Proxy {
  customised?: boolean
  'aux-uid-switch': number
  'aux-tx-enable': number
  'proxy-uid': number[]
}
