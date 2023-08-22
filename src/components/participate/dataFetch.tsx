import axios from 'axios';
import { participationDataProps } from './list';

export async function fetchInfo(): Promise<participationDataProps> {
  const response = await axios.get('/test/participate.json');
  return await Promise.resolve(response.data.data);
}
