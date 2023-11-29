import {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = () => {
  const [data, setData] = useState('data');
  console.log(data);
  return (
    <QRCodeScanner
      onRead={({data}) => setData(data)}
      reactivate={true}
      reactivateTimeout={500}
      showMarker={true}
    />
  );
};

export default Scanner;
