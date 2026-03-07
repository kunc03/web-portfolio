import type { StaticImageData } from 'next/image';
import kopiq from '@/public/kopiQ.png';
import jprefund from '@/public/jprefund.png';
import manrisk from '@/public/manrisk.png';
import dclinic from '@/public/dclinic.png';
import rentCar from '@/public/rentCar.png';
import shopper from '@/public/shopper.png';
import gachaEndoji from '@/public/gacha-endoji.png';
import gachaRogaining from '@/public/rogaining.png';
import aichiGurutto from '@/public/aichi-gurutto.png';
import store from '@/public/store.png';

export const PROJECT_IMAGE_KEYS = [
  'aichiGurutto',
  'gachaRogaining',
  'gachaEndoji',
  'manrisk',
  'dclinic',
  'jprefund',
  'store',
  'shopper',
  'rentCar',
  'kopiq',
] as const;

export type ProjectImageKey = (typeof PROJECT_IMAGE_KEYS)[number];

const PROJECT_IMAGES: Record<ProjectImageKey, StaticImageData> = {
  aichiGurutto,
  gachaRogaining,
  gachaEndoji,
  manrisk,
  dclinic,
  jprefund,
  store,
  shopper,
  rentCar,
  kopiq,
};

export function resolveProjectImage(imageKey: string): StaticImageData {
  return PROJECT_IMAGES[(imageKey as ProjectImageKey) in PROJECT_IMAGES ? (imageKey as ProjectImageKey) : 'kopiq'];
}
