import axios from 'axios';
import { BASE_URL } from './Api';

const usersApi = {
  async usersList(page, limit, search, filterDate) {
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        params: {
          page,
          limit,
          search,
          filterDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default usersApi;
