import Ember from 'ember';

export default Ember.Service.extend({
  items: null,
  defaultIds: null,

  init() {
    this._super(...arguments);
    this.set('items', [
      {id: 0, name: 'Accra', tz: 'Africa/Accra'},
      {id: 1, name: 'Addis Ababa', tz: 'Africa/Addis_Ababa'},
      {id: 2, name: 'Adelaide', tz: 'Australia/Adelaide'},
      {id: 3, name: 'Algiers', tz: 'Africa/Algiers'},
      {id: 4, name: 'Almaty', tz: 'Asia/Almaty'},
      {id: 5, name: 'Amman', tz: 'Asia/Amman'},
      {id: 6, name: 'Amsterdam', tz: 'Europe/Amsterdam'},
      {id: 7, name: 'Anadyr', tz: 'Asia/Anadyr'},
      {id: 8, name: 'Anchorage', tz: 'America/Anchorage'},
      {id: 9, name: 'Ankara', tz: 'Europe/Istanbul'},
      {id: 10, name: 'Antananarivo', tz: 'Indian/Antananarivo'},
      {id: 11, name: 'Asuncion', tz: 'America/Asuncion'},
      {id: 12, name: 'Athens', tz: 'Europe/Athens'},
      {id: 13, name: 'Atlanta', tz: 'America/New_York'},
      {id: 14, name: 'Auckland', tz: 'Pacific/Auckland'},
      {id: 15, name: 'Baghdad', tz: 'Asia/Baghdad'},
      {id: 16, name: 'Bangkok', tz: 'Asia/Bangkok'},
      {id: 17, name: 'Barcelona', tz: 'Europe/Madrid'},
      {id: 18, name: 'Beijing', tz: 'Asia/Shanghai'},
      {id: 19, name: 'Beirut', tz: 'Asia/Beirut'},
      {id: 20, name: 'Belgrade', tz: 'Europe/Belgrade'},
      {id: 21, name: 'Bengaluru', tz: 'Asia/Kolkata'},
      {id: 22, name: 'Berlin', tz: 'Europe/Berlin'},
      {id: 23, name: 'Bogota', tz: 'America/Bogota'},
      {id: 24, name: 'Boston', tz: 'America/New_York'},
      {id: 25, name: 'Brasilia', tz: 'America/Sao_Paulo'},
      {id: 26, name: 'Brisbane', tz: 'Australia/Brisbane'},
      {id: 27, name: 'Brussels', tz: 'Europe/Brussels'},
      {id: 28, name: 'Bucharest', tz: 'Europe/Bucharest'},
      {id: 29, name: 'Budapest', tz: 'Europe/Budapest'},
      {id: 30, name: 'Buenos Aires', tz: 'America/Buenos_Aires'},
      {id: 31, name: 'Cairo', tz: 'Africa/Cairo'},
      {id: 32, name: 'Calgary', tz: 'America/Edmonton'},
      {id: 33, name: 'Canberra', tz: 'Australia/Canberra'},
      {id: 34, name: 'Cape Town', tz: 'Africa/Johannesburg'},
      {id: 35, name: 'Caracas', tz: 'America/Caracas'},
      {id: 36, name: 'Casablanca', tz: 'Africa/Casablanca'},
      {id: 37, name: 'Chicago', tz: 'America/Chicago'},
      {id: 38, name: 'Copenhagen', tz: 'Europe/Copenhagen'},
      {id: 39, name: 'Dallas', tz: 'America/Chicago'},
      {id: 40, name: 'Dar es Salaam', tz: 'Africa/Dar_es_Salaam'},
      {id: 41, name: 'Darwin', tz: 'Australia/Darwin'},
      {id: 42, name: 'Denver', tz: 'America/Denver'},
      {id: 43, name: 'Detroit', tz: 'America/Detroit'},
      {id: 44, name: 'Dhaka', tz: 'Asia/Dhaka'},
      {id: 45, name: 'Doha', tz: 'Asia/Qatar'},
      {id: 46, name: 'Dubai', tz: 'Asia/Dubai'},
      {id: 47, name: 'Dublin', tz: 'Europe/Dublin'},
      {id: 48, name: 'Edmonton', tz: 'America/Edmonton'},
      {id: 49, name: 'Frankfurt', tz: 'Europe/Berlin'},
      {id: 50, name: 'Guatemala City', tz: 'America/Guatemala'},
      {id: 51, name: 'Halifax', tz: 'America/Halifax'},
      {id: 52, name: 'Hanoi', tz: 'Asia/Ho_Chi_Minh'},
      {id: 53, name: 'Harare', tz: 'Africa/Harare'},
      {id: 54, name: 'Havana', tz: 'America/Havana'},
      {id: 55, name: 'Helsinki', tz: 'Europe/Helsinki'},
      {id: 56, name: 'Hong Kong', tz: 'Asia/Hong_Kong'},
      {id: 57, name: 'Honolulu', tz: 'Pacific/Honolulu'},
      {id: 58, name: 'Houston', tz: 'America/Chicago'},
      {id: 59, name: 'Indianapolis', tz: 'America/Indianapolis'},
      {id: 60, name: 'Islamabad', tz: 'Asia/Karachi'},
      {id: 61, name: 'Istanbul', tz: 'Europe/Istanbul'},
      {id: 62, name: 'Jakarta', tz: 'Asia/Jakarta'},
      {id: 63, name: 'Jerusalem', tz: 'Asia/Jerusalem'},
      {id: 64, name: 'Johannesburg', tz: 'Africa/Johannesburg'},
      {id: 65, name: 'Kabul', tz: 'Asia/Kabul'},
      {id: 66, name: 'Karachi', tz: 'Asia/Karachi'},
      {id: 67, name: 'Kathmandu', tz: 'Asia/Kathmandu'},
      {id: 68, name: 'Khartoum', tz: 'Africa/Khartoum'},
      {id: 69, name: 'Kingston', tz: 'America/Jamaica'},
      {id: 70, name: 'Kinshasa', tz: 'Africa/Kinshasa'},
      {id: 71, name: 'Kiritimati', tz: 'Pacific/Kiritimati'},
      {id: 72, name: 'Kolkata', tz: 'Asia/Kolkata'},
      {id: 73, name: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur'},
      {id: 74, name: 'Kuwait City', tz: 'Asia/Kuwait'},
      {id: 75, name: 'Kyiv', tz: 'Europe/Kiev'},
      {id: 76, name: 'La Paz', tz: 'America/La_Paz'},
      {id: 77, name: 'Lagos', tz: 'Africa/Lagos'},
      {id: 78, name: 'Lahore', tz: 'Asia/Karachi'},
      {id: 79, name: 'Las Vegas', tz: 'America/Los_Angeles'},
      {id: 80, name: 'Lima', tz: 'America/Lima'},
      {id: 81, name: 'Lisbon', tz: 'Europe/Lisbon'},
      {id: 82, name: 'London', tz: 'Europe/London'},
      {id: 83, name: 'Los Angeles', tz: 'America/Los_Angeles'},
      {id: 84, name: 'Madrid', tz: 'Europe/Madrid'},
      {id: 85, name: 'Managua', tz: 'America/Managua'},
      {id: 86, name: 'Manila', tz: 'Asia/Manila'},
      {id: 87, name: 'Melbourne', tz: 'Australia/Melbourne'},
      {id: 88, name: 'Mexico City', tz: 'America/Mexico_City'},
      {id: 89, name: 'Miami', tz: 'America/New_York'},
      {id: 90, name: 'Minneapolis', tz: 'America/Chicago'},
      {id: 91, name: 'Minsk', tz: 'Europe/Minsk'},
      {id: 92, name: 'Montevideo', tz: 'America/Montevideo'},
      {id: 93, name: 'Montreal', tz: 'America/Montreal'},
      {id: 94, name: 'Moscow', tz: 'Europe/Moscow'},
      {id: 95, name: 'Mumbai', tz: 'Asia/Kolkata'},
      {id: 96, name: 'Nairobi', tz: 'Africa/Nairobi'},
      {id: 97, name: 'Nassau', tz: 'America/Nassau'},
      {id: 98, name: 'New Delhi', tz: 'Asia/Kolkata'},
      {id: 99, name: 'New Orleans', tz: 'America/Chicago'},
      {id: 100, name: 'New York', tz: 'America/New_York'},
      {id: 101, name: 'Oslo', tz: 'Europe/Oslo'},
      {id: 102, name: 'Ottawa', tz: 'America/Toronto'},
      {id: 103, name: 'Paris', tz: 'Europe/Paris'},
      {id: 104, name: 'Perth', tz: 'Australia/Perth'},
      {id: 105, name: 'Philadelphia', tz: 'America/New_York'},
      {id: 106, name: 'Phoenix', tz: 'America/Phoenix'},
      {id: 107, name: 'Prague', tz: 'Europe/Prague'},
      {id: 108, name: 'Reykjavik', tz: 'Atlantic/Reykjavik'},
      {id: 109, name: 'Rio de Janeiro', tz: 'America/Sao_Paulo'},
      {id: 110, name: 'Riyadh', tz: 'Asia/Riyadh'},
      {id: 111, name: 'Rome', tz: 'Europe/Rome'},
      {id: 112, name: 'Salt Lake City', tz: 'America/Denver'},
      {id: 113, name: 'San Francisco', tz: 'America/Los_Angeles'},
      {id: 114, name: 'San Juan', tz: 'America/Argentina/San_Juan'},
      {id: 115, name: 'San Salvador', tz: 'America/El_Salvador'},
      {id: 116, name: 'Santiago', tz: 'America/Santiago'},
      {id: 117, name: 'Santo Domingo', tz: 'America/Santo_Domingo'},
      {id: 118, name: 'Sao Paulo', tz: 'America/Sao_Paulo'},
      {id: 119, name: 'Seattle', tz: 'America/Los_Angeles'},
      {id: 120, name: 'Seoul', tz: 'Asia/Seoul'},
      {id: 121, name: 'Shanghai', tz: 'Asia/Shanghai'},
      {id: 122, name: 'Singapore', tz: 'Asia/Singapore'},
      {id: 123, name: 'Sofia', tz: 'Europe/Sofia'},
      {id: 124, name: 'St. John\'s', tz: 'America/St_Johns'},
      {id: 125, name: 'Stockholm', tz: 'Europe/Stockholm'},
      {id: 126, name: 'Suva', tz: 'Pacific/Fiji'},
      {id: 127, name: 'Sydney', tz: 'Australia/Sydney'},
      {id: 128, name: 'Taipei', tz: 'Asia/Taipei'},
      {id: 129, name: 'Tallinn', tz: 'Europe/Tallinn'},
      {id: 130, name: 'Tashkent', tz: 'Asia/Tashkent'},
      {id: 131, name: 'Tegucigalpa', tz: 'America/Tegucigalpa'},
      {id: 132, name: 'Tehran', tz: 'Asia/Tehran'},
      {id: 133, name: 'Tokyo', tz: 'Asia/Tokyo'},
      {id: 134, name: 'Toronto', tz: 'America/Toronto'},
      {id: 135, name: 'Vancouver', tz: 'America/Vancouver'},
      {id: 136, name: 'Vienna', tz: 'Europe/Vienna'},
      {id: 137, name: 'Warsaw', tz: 'Europe/Warsaw'},
      {id: 138, name: 'Washington DC', tz: 'America/New_York'},
      {id: 139, name: 'Winnipeg', tz: 'America/Winnipeg'},
      {id: 140, name: 'Yangon', tz: 'Asia/Yangon'},
      {id: 141, name: 'Zagreb', tz: 'Europe/Zagreb'},
      {id: 142, name: 'Zurich', tz: 'Europe/Zurich'},
    ]);
    this.set('defaultIds', [113, 87, 137]);
  }
});
