import axios from 'axios';
import { BASE_URL } from './Api';

const moviesApi = {
    async moviesList(page, limit, search) {
        const response = await axios.get(`${BASE_URL}/movies`, {
          params: { page, limit, search },
        });
        return response.data;
      },

  async deleteMovie(id) {
    
  },
};

export default moviesApi;
