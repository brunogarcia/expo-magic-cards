import React, { Component } from 'react';
import { Text } from 'react-native-elements';
import {
  View,
  StyleSheet,
  SectionList,
} from 'react-native';

import CardHeader from './CardHeader';
import CardDetail from './CardDetail';
import CardOverlay from './CardOverlay';
import mapCards from '../utils/mapCards';
import constants from '../utils/constants';

const { API } = constants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 5,
      cards: [],
      isLoading: true,
      isRefreshing: false,
      isOverlayVisible: false,
      overlayImageUrl: '',
    };
  }

  componentDidMount() {
    this.fetchCards();
  }

  /**
   * Fetch more cards
   */
  fetchMoreCards = () => {
    const { isRefreshing } = this.state;
    if (isRefreshing) {
      return null;
    }

    this.setState(
      (prevState) => ({
        isRefreshing: true,
        page: prevState.page + 1,
      }),
      () => {
        this.fetchCards();
      },
    );

    return false;
  }

  /**
   * Show overlay
   */
  handleShowOverlay = (imageUrl) => {
    this.setState({
      overlayImageUrl: imageUrl,
      isOverlayVisible: true,
    });
  }

  /**
   * Hide overlay
   */
  handleHideOverlay = () => {
    this.setState({
      overlayImageUrl: '',
      isOverlayVisible: false,
    });
  }

  /**
   * Get the cards from the Magic API
   *
   * @async
   */
  async fetchCards() {
    const { page, pageSize } = this.state;

    try {
      const response = await fetch(`${API}cards?page=${page}&pageSize=${pageSize}&contains=imageUrl`);
      const { cards } = await response.json();
      this.saveCards(cards);
    } catch (error) {
      // TODO: send the error to Sentry
      // eslint-disable-next-line
      console.log(error);
    }
  }

  /**
   * Save cards into the state
   *
   * @param {object} cards - Cards data
   */
  saveCards(cards) {
    this.setState(
      (prevState) => ({
        isLoading: false,
        isRefreshing: false,
        cards: [...prevState.cards, ...mapCards(cards)],
      }),
    );
  }

  render() {
    const {
      cards,
      isLoading,
      isRefreshing,
      isOverlayVisible,
      overlayImageUrl,
    } = this.state;

    return (
      isLoading
        ? (
          <View style={styles.container}>
            <Text>Loading...</Text>
          </View>
        )
        : (
          <View style={styles.container}>
            <SectionList
              renderItem={({ item }) => <CardDetail item={item} handleShowOverlay={this.handleShowOverlay} />}
              renderSectionHeader={({ section: { name } }) => <CardHeader name={name} />}
              ListFooterComponent={<Text>Loading...</Text>}
              sections={cards}
              keyExtractor={({ id }) => id}
              onEndReached={this.fetchMoreCards}
              onEndReachedThreshold={0.1}
              refreshing={isRefreshing}
            />
            {
              isOverlayVisible
              && <CardOverlay imageUrl={overlayImageUrl} handleHideOverlay={this.handleHideOverlay} />
            }
          </View>
        )
    );
  }
}
