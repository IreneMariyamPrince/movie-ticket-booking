import axios from 'axios';
import { BASE_URL } from './Api';

const showOwnersApi = {
  async showOwnersList(page, limit, search, filterDate, filterStatus) {
    try {
      const response = await axios.get(`${BASE_URL}/showOwners`, {
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

  async deleteShowOwner(userId) {
    try {
      const response = await axios.delete(`${BASE_URL}/showOwners/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async sendOtp(phoneNumber) {
    try {
      const response = await axios.post(`${BASE_URL}/send-otp`, { phoneNumber });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error sending OTP';
    }
  },

  async verifyOtp(phoneNumber, otp, userRole, userStatus) {
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, {
        phoneNumber, 
        otp,
        userRole,
        userStatus
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || 'Error sending OTP';
    }
  },

  async createShowOwner(data) {
    try {
      const response = await axios.post(`${BASE_URL}/show-owner`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating show owner:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async getShowOwnerDetails(userId) {
    try {
      const response = await axios.get(`${BASE_URL}/show-owner/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show owner details:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  async checkShowOwnerExists(userId) {
    try {
      const response = await axios.get(`${BASE_URL}/show-owner-exists/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show owner details:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

};

export default showOwnersApi;
