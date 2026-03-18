import { IVivinoSyncResponse } from '@/redux/services/types/admin';
import { FieldValues } from 'react-hook-form';

export const syncModalReceivedFormData = (data: IVivinoSyncResponse) => ({
  sync_vineyard_place: data?.vineyard_place,
  sync_region_place: data?.region_place,
  sync_world_place: data?.world_place,
  sync_vivino_rating: data?.vivino_rating,
  sync_producer_name: data?.producer?.name,
  sync_acidity_level: data?.attributes.acidity_level,
  sync_bodied_level: data?.attributes.bodied_level,
  sync_fizziness_level: data?.attributes.fizziness_level,
  sync_sweetness_level: data?.attributes.sweetness_level,
  sync_tannin_level: data?.attributes.tannin_level,
  sync_taste_notes: data?.taste_notes?.map((note) => ({
    id: note.id,
    name: note.value,
    percent: note.percent,
  })),
});

export const syncModalResetFormData = (data: FieldValues) => ({
  vineyard_place: Number(data?.sync_vineyard_place),
  region_place: Number(data?.sync_region_place),
  world_place: Number(data?.sync_world_place),
  vivino_rating: Number(data?.sync_vivino_rating),
  name: data?.sync_producer_name,
  acidity_level: String(data?.sync_acidity_level),
  bodied_level: String(data?.sync_bodied_level),
  fizziness_level: String(data?.sync_fizziness_level),
  sweetness_level: String(data?.sync_sweetness_level),
  tannin_level: String(data?.sync_tannin_level),
  taste_notes: data?.sync_taste_notes,
});
