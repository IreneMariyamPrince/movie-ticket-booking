import axios from 'axios';
import { BASE_URL } from './Api';

const productionCompaniesApi = {
  async productionCompaniesList(page, limit, search, filterDate, filterStatus) {
    try {
      const response = await axios.get(`${BASE_URL}/productionCompanies`, {
        params: {
          page,
          limit,
          search,
          filterDate,
          filterStatus
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async deleteProductionCompany(userId) {
    try {
      const response = await axios.delete(`${BASE_URL}/productionCompanies/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};

export default productionCompaniesApi;
