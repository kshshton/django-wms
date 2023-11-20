import {
  Alert,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {colors} from '../../config/colors';
import {v4} from 'react-native-uuid/src/v4';

const CustomerFormSchema = Yup.object().shape({
  city: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  state: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  streetName: Yup.string()
    .min(2, 'Wartość jest zbyt krótka!')
    .max(50, 'Wartość jest zbyt długa!')
    .required('Obowiązkowe pole!'),
  buildingNumber: Yup.string()
    .matches(/^\d+.*?/)
    .required('Obowiązkowe pole!'),
  apartmentNumber: Yup.string()
    .matches(/^\d+.*?/)
    .optional(),
});

const AddressForm = ({route, navigation}) => {
  const {order} = route.params;

  const handleSubmit = async values => {
    order.id = v4();
    order.address = values;
    order.address.id = v4();
    order.address.customerEmail = order.customer.email;
    order.products = order.products.map(product => ({
      ...product,
      orderId: order.id,
    }));

    await fetch('http://192.168.0.167:8000/api/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id: v4(),
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        email: order.customer.email,
        phone: order.customer.phone || null,
      }),
    })
      .then(res => res.json())
      .catch(_err => console.error(_err));

    await fetch('http://192.168.0.167:8000/api/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id: order.address.id,
        city: order.address.city,
        state: order.address.state,
        streetName: order.address.streetName,
        buildingNumber: order.address.buildingNumber,
        apartmentNumber: order.address.apartmentNumber,
        customerEmail: order.customer.email,
      }),
    })
      .then(res => res.json())
      .catch(_err => console.error(_err));

    const r = await fetch('http://192.168.0.167:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id: order.id,
        addressId: order.address.id,
        cart: order.products,
      }),
    });

    console.log(await r.json());

    Alert.alert('Wysłano!');
  };

  return (
    <Formik
      initialValues={{
        city: '',
        state: '',
        streetName: '',
        buildingNumber: '',
        apartmentNumber: '',
        customerEmail: '',
      }}
      validationSchema={CustomerFormSchema}
      onSubmit={values => handleSubmit(values)}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <View style={styles.wrapper}>
          <StatusBar barStyle={'light-content'} />
          <View style={styles.formContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Miejscowość"
                autoCapitalize={'words'}
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={() => setFieldTouched('city')}
              />
              {touched.city && errors.city && (
                <Text style={styles.errorTxt}>{errors.city}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Województwo"
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={() => setFieldTouched('state')}
              />
              {touched.state && errors.state && (
                <Text style={styles.errorTxt}>{errors.state}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Ulica"
                autoCapitalize={'words'}
                value={values.streetName}
                onChangeText={handleChange('streetName')}
                onBlur={() => setFieldTouched('streetName')}
              />
              {touched.streetName && errors.streetName && (
                <Text style={styles.errorTxt}>{errors.streetName}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Numer budynku"
                value={values.buildingNumber}
                onChangeText={handleChange('buildingNumber')}
                onBlur={() => setFieldTouched('buildingNumber')}
              />
              {touched.buildingNumber && errors.buildingNumber && (
                <Text style={styles.errorTxt}>{errors.buildingNumber}</Text>
              )}
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputStyle}
                placeholder="Numer mieszkania"
                value={values.apartmentNumber}
                onChangeText={handleChange('apartmentNumber')}
                onBlur={() => setFieldTouched('apartmentNumber')}
              />
              {touched.apartmentNumber && errors.apartmentNumber && (
                <Text style={styles.errorTxt}>{errors.apartmentNumber}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitBtn,
                {backgroundColor: isValid ? colors.gray : colors.turquoise},
              ]}
              disabled={!isValid}>
              <Text style={styles.submitBtnTxt}>Zamów</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddressForm;