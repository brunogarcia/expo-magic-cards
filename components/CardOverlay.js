import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {
  Image,
  Button,
  Overlay,
} from 'react-native-elements';

export default function CardOverlay(props) {
  const { imageUrl, handleHideOverlay } = props;

  return (
    <Overlay
    isVisible
    onBackdropPress={handleHideOverlay}
    >
      <View>
        {
          imageUrl ?
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            PlaceholderContent={<ActivityIndicator />} />
          :
          <Text>No image</Text>
        }
        <Button
          title="Close"
          type="outline"
          onPress={handleHideOverlay}
        />
      </View>
    </Overlay>
  );
}

CardOverlay.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  handleHideOverlay: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 310,
    marginBottom: 20,
  },
});
