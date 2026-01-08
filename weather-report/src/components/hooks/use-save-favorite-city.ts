import api from '../../services/api';
import type { City } from './use-city-search';

export async function saveFavoriteCity(city: City | null) {
  try {
    const response = await api.patch('/auth/favorite-city', {
      favoriteCity: city,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving favorite city:', error);
    throw error;
  }
}
