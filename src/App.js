import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const timeZones = {
  Korea: 'Asia/Seoul',
  Winnipeg: 'America/Winnipeg',
  'Hong Kong': 'Asia/Hong_Kong',
  Guanzhou: 'Asia/Shanghai',
  Shanghai: 'Asia/Shanghai',
  Singapore: 'Asia/Singapore',
  Australia: 'Australia/Sydney',
  'New York': 'America/New_York',
  Mexico: 'America/Mexico_City',
  Germany: 'Europe/Berlin',
  England: 'Europe/London',
  UAE: 'Asia/Dubai',
  France: 'Europe/Paris',
  Japan: 'Asia/Tokyo',
  Denmark: 'Europe/Copenhagen',
  'New Zealand': 'Pacific/Auckland',
  Netherlands: 'Europe/Amsterdam',
  Toronto: 'America/Toronto',
  Vancouver: 'America/Vancouver',
  California: 'America/Los_Angeles',
};

const App = () => {
  const [selectedCountry1, setSelectedCountry1] = useState('');
  const [selectedCountry2, setSelectedCountry2] = useState('');
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const timeZone1 = timeZones[selectedCountry1];
      const timeZone2 = timeZones[selectedCountry2];

      if (!timeZone1 || !timeZone2) return;

      const currentTime = new Date();
      const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
      const currentTime1 = currentTime.toLocaleTimeString('en-US', { ...options, timeZone: timeZone1 });
      const currentTime2 = currentTime.toLocaleTimeString('en-US', { ...options, timeZone: timeZone2 });

      setTime1(currentTime1);
      setTime2(currentTime2);
    };

    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, [selectedCountry1, selectedCountry2]);

  const handleCountry1Change = (e) => {
    setSelectedCountry1(e.target.value);
  };

  const handleCountry2Change = (e) => {
    setSelectedCountry2(e.target.value);
  };

  const calculateDistance = (country1, country2) => {
    // 나라들의 위도 및 경도 정보
    const countryCoordinates = {
      Korea: { latitude: 37.5665, longitude: 126.9780 },
      Winnipeg: { latitude: 49.8950, longitude: -97.1384 },
      'Hong Kong': { latitude: 22.3193, longitude: 114.1694 },
      Guanzhou: { latitude: 23.1291, longitude: 113.2644 },
      Shanghai: { latitude: 31.2304, longitude: 121.4737 },
      Singapore: { latitude: 1.3521, longitude: 103.8198 },
      Australia: { latitude: -33.8688, longitude: 151.2093 },
      'New York': { latitude: 40.7128, longitude: -74.0060 },
      Mexico: { latitude: 19.4326, longitude: -99.1332 },
      Germany: { latitude: 51.1657, longitude: 10.4515 },
      England: { latitude: 51.5074, longitude: -0.1278 },
      UAE: { latitude: 25.2048, longitude: 55.2708 },
      France: { latitude: 46.6031, longitude: 1.8883 },
      Japan: { latitude: 35.6895, longitude: 139.6917 },
      Denmark: { latitude: 55.6761, longitude: 12.5683 },
      'New Zealand': { latitude: -40.9006, longitude: 174.8860 },
      Netherlands: { latitude: 52.3702, longitude: 4.8952 },
      Toronto: { latitude: 43.6510, longitude: -79.3470 },
      Vancouver: { latitude: 49.2827, longitude: -123.1207 },
      California: { latitude: 36.7783, longitude: -119.4179 }
    };
  
   
  // 나라들의 위도와 경도를 기반으로 거리 계산
  const coordinate1 = countryCoordinates[country1];
  const coordinate2 = countryCoordinates[country2];

  if (!coordinate1 || !coordinate2) {
    return '';
  }

  const lat1 = coordinate1.latitude;
  const lon1 = coordinate1.longitude;
  const lat2 = coordinate2.latitude;
  const lon2 = coordinate2.longitude;

  // 두 지점 간의 실제 거리 계산
  const earthRadius = 6371; // 지구의 반지름 (단위: km)

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return `${distance.toFixed(2)} km`;
};

// 도(degree)를 라디안(radian)으로 변환하는 함수
const degToRad = (deg) => {
  return deg * (Math.PI / 180);
};

  return (
    <Container>
  <Typography variant="h4" align="center" gutterBottom style={{ marginTop: '4rem', color: '#333' }}>
    너의 시간이 궁금해,
  </Typography>
  <Grid container spacing={2} justifyContent="center" style={{ marginTop: '2rem' }}>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel style={{ background: '#fff' }}>기준이 되는 시간을 선택해주세요</InputLabel>
        <Select value={selectedCountry1} onChange={handleCountry1Change}>
          <MenuItem value="">-- Select Country --</MenuItem>
          {Object.keys(timeZones).map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel style={{ background: '#fff' }}>시간이 궁금한 나라를 선택해주세요</InputLabel>
        <Select value={selectedCountry2} onChange={handleCountry2Change}>
          <MenuItem value="">-- Select Country --</MenuItem>
          {Object.keys(timeZones).map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    {selectedCountry1 && (
      <Grid item xs={12} style={{ marginTop: '1rem' }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: '#666' }}>
          {selectedCountry1} {time1}
        </Typography>
      </Grid>
    )}
    {selectedCountry2 && (
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: '#666' }}>
          {selectedCountry2} {time2}
        </Typography>
      </Grid>
    )}
    {selectedCountry1 && selectedCountry2 && (
      <Grid item xs={12}>
        <Typography variant="h6" align="center" gutterBottom style={{ color: '#666' }}>
          우리가 떨어진 거리: {calculateDistance(selectedCountry1, selectedCountry2)}
        </Typography>
      </Grid>
    )}
  </Grid>
</Container>

  );
};

export default App;