import QRCodeScanner from 'react-native-qrcode-scanner';

const Scanner = ({navigation}) => {
  const navigateToProduct = productId => {
    navigation.navigate('Product', {productId});
  };

  return (
    <QRCodeScanner
      onRead={({data}) => navigateToProduct(data)}
      reactivate={true}
      reactivateTimeout={500}
      showMarker={true}
    />
  );
};

export default Scanner;
