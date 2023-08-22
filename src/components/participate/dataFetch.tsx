import { ParticipationProps } from '@/types/ParticipateType';
import axios from 'axios';

export async function fetchInfo(): Promise<ParticipationProps> {
  const response = await axios.get('/test/participate.json');
  return await Promise.resolve(response.data.data);
}
