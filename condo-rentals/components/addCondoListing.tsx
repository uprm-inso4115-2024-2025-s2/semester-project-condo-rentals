import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const AddCondoListing = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/(tabs)/ListingDetails');
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleRedirect}
        style={styles.button}
      >
        <Image
          source={require('../assets/images/Condo Rental Assets/Condo_add.png')}
          style={styles.image}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10, // Changed to match container
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 24,
    height: 24,
  }
});

export default AddCondoListing;
