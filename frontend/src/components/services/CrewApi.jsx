import axios from 'axios';
import { BASE_URL } from './Api';

const crewApi = {
  async crewList(page, limit, search, filterDate, filterRole) {
    try {
      const response = await axios.get(`${BASE_URL}/crew`, {
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

  async deleteCrew(userId) {
    try {
      const response = await axios.delete(`${BASE_URL}/crew/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default crewApi;
