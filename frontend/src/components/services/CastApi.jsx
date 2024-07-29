import axios from 'axios';
import { BASE_URL } from './Api';

const castsApi = {
  async castsList(page, limit, search, filterDate, filterRole) {
    try {
      const response = await axios.get(`${BASE_URL}/casts`, {
        params: {
          page,
          limit,
          search,
          filterDate, 
          filterRole
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async deleteCast(userId) {
    try {
      const response = await axios.delete(`${BASE_URL}/casts/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default castsApi;
