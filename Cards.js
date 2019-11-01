import constants from './constants';
import React from 'react';
import {
  StyleSheet,
  SectionList,
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

const { API } = constants;

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.fetchCards();
  }

  /**
   * Get the cards from the Magic API and
   * save them into the component state
   */
  async fetchCards() {
    return fetch(`${API}cards?page=0&pageSize=5&contains=imageUrl`)
    .then(response => response.json())
    .then(responseJson => {
      this.setState(
        {
          isLoading: false,
          dataSource: this.mapCards(responseJson.cards),
        },
        function() {}
      );
    })
    .catch(error => {
      console.error(error);
    });
  }

  /**
   * Get colors
   * 
   * @param {Array<string>} colors
   * @returns {string} The color value to lowercase
   */
  getColors(colors) {
    if (colors.length > 0) {
      const [color] = colors;
      return color.toLowerCase();
    }
  }

  /**
   * Map cards
   * 
   * @param {Array<object>} cards - The card list
   * @returns {Array<object>} The cards mapped
   */
  mapCards(cards) {
    return cards.map(card => {
      const { name , colors, type, setName } = card;

      return {
        name,
        data: [
          {
            colors: this.getColors(colors),
            type,
            setName,
          }
        ],
      };
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SectionList
          renderItem={({ item, index }) =>
            <View style={styles.itemData}>
              <View style={[styles.itemColor, { backgroundColor: item.colors }]} />
              <Text key={item.type + index}>{item.type}</Text>
              <Text key={item.setName + index}>{item.setName}</Text>
            </View>
          }
          renderSectionHeader={({ section: { name } }) => (
            <Text style={styles.itemHeader}>{name}</Text>
          )}
          sections={this.state.dataSource}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    padding: 50,
  },
  container: {
    flex: 1,
    padding: 50,
  },
  itemHeader: {
    fontWeight: 'bold',
  },
  itemData: {
    paddingBottom: 20,
  },
  itemColor: {
    width: 10,
    height: 10,
  }
});
