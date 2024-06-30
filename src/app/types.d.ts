export interface User {
    name: string
    username: string
    email: string
    phone: string
    permission: string
    id: number
  }

export interface Beehive {
      id: number
      name: string
      identifier: string
      location_provincia: string
      location_municipio: string
  }

export interface Measurement {
    datetime: string
    temperature: number
    humidity: number
    notes: string
    sound_token: string
    sound_interval: string
    sound_bits_resolution: number
    sound_bits_integer: number
    sound_samples: number
    id: number
    owner_beehive_id: number

}