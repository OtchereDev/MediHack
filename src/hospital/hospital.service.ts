import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HospitalService {
  async closestHospital(longitude: string, latitude: string) {
    const endpoint =
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    const params = {
      location: `${latitude},${longitude}`,
      radius: 5000, // Search within a 5 km radius
      type: 'hospital',
      key: process.env.MAP_API,
    };

    console.log('API', process.env.MAP_API);

    try {
      const response = await axios.get(endpoint, { params });
      console.log(response);
      const hospitals = response.data.results;

      return {
        status: 200,
        data: {
          message: 'Closest hospital near you',
          hospitals,
        },
      };
    } catch (error) {
      console.error('Error fetching data from Google Maps API:', error);
      return {
        status: 400,
        data: {
          message: error,
        },
      };
    }
  }
}
