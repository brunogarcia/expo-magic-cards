import constants from '../utils/constants';
import React from 'react';
import {
  View,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import CardHeader from './CardHeader';
import CardDetail from './CardDetail';

const { API } = constants;

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 5,
      cards: [],
      isLoading: true,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.fetchCards();
  }

  /**
   * Get the cards from the Magic API and
   * save them into the component state
   */
  async fetchCards() {
    const { page, pageSize } = this.state;

    return fetch(`${API}cards?page=${page}&pageSize=${pageSize}&contains=imageUrl`)
    .then(response => response.json())
    .then(response => this.mapCards(response.cards))
    .then(response => {
      this.setState(
        (prevState) => {
          return {
            isLoading: false,
            isRefreshing: false,
            cards: [...prevState.cards, ...response],
          }
        }
      );
    })
    .catch(error => {
      console.error(error);
    });
  }

  fetchMoreCards = () => {
     if (this.state.refreshing){
      return null;
    }
    
    this.setState(
      (prevState) => {
        return {
          isRefreshing: true,
          page: prevState.page + 1,
        };
      },
      () => {
        this.fetchCards();
      }
    );
  }

  /**
   * Get color
   * 
   * @param {Array<string>} colors
   * @returns {string} The color value to lowercase
   */
  getColor(colors) {
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
      const {
        id,
        name,
        colors,
        type,
        setName,
        imageUrl,
      } = card;

      return {
        id,
        name,
        data: [
          {
            color: this.getColor(colors),
            type,
            setName,
            imageUrl,
          }
        ],
      };
    });
  }

  renderListFooter = () => {
    if (this.state.isRefreshing) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return null;
  };

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
          renderItem={({ item }) => <CardDetail item={item} />}
          renderSectionHeader={({ section: { name } }) => <CardHeader name={name} />}
          ListFooterComponent={this.renderListFooter}
          sections={this.state.cards}
          keyExtractor={({ id }) => id}
          onEndReached={this.fetchMoreCards}
          onEndReachedThreshold={0.1}
          refreshing={this.state.isRefreshing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
