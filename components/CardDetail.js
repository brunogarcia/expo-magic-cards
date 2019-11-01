import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {
  Image,
  Button,
  Overlay,
  Divider,
} from 'react-native-elements';

export default class CardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isVisible: false };
  }

  handleShowOverlay = () => {
    this.setState({ isVisible: true });
  };

  handleHideOverlay = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const { item } = this.props;
    const { isVisible } = this.state;

    return (
      <TouchableOpacity
        onPress={this.handleShowOverlay}
      >
        <View style={styles.container}>
          { 
            item.color &&
            <View style={[styles.color, { backgroundColor: item.color }]} />
          }
          <Text key={item.type}>{item.type}</Text>
          <Text key={item.setName}>{item.setName}</Text>
          <Divider style={styles.divider} />
          {
            isVisible && (
              <Overlay
                isVisible
                onBackdropPress={this.handleHideOverlay}
              >
                <View>
                  {
                    item.imageUrl ?
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.image}
                      PlaceholderContent={<ActivityIndicator />} />
                    :
                    <Text>No image</Text>
                  }
                  <Button
                    title="Close"
                    type="outline"
                    onPress={this.handleHideOverlay}
                  />
                </View>
              </Overlay>
            )
          }
        </View>
      </TouchableOpacity>
    );
  }
}

CardDetail.propTypes = {
  item: PropTypes.shape({
    color: PropTypes.string,
    type: PropTypes.string.isRequired,
    setName: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  color: {
    width: 10,
    height: 10,
  },
  image: {
    width: 220,
    height: 310,
    marginBottom: 20,
  },
  divider: {
    marginTop: 20,
  },
});
