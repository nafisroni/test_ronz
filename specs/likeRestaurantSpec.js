import LikeButtonInitiator from '../src/scripts/utils/likebutton-initiator';
import FavoriteRestaurantDB from '../src/scripts/data/fav-restaurant';

import '../src/scripts/views/pages/detail';

describe('Liking A Restaurants', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };
  beforeEach(() => {
    addLikeButtonContainer();
  });

    it ('should show the like button when the Restaurant has not been liked before', async () => {
        await LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
              id:'rqdv5juczeskfw1e867',
            },
          });
          expect(document.querySelector('[aria-label="like this Restaurant"]')).toBeTruthy();
    });

    it ('should show the unlike button when the Restaurant has not been liked before', async () => {
      await LikeButtonInitiator.init({
          likeButtonContainer: document.querySelector('#likeButtonContainer'),
          restaurant: {
            id:'rqdv5juczeskfw1e867',
          },
        });

        expect(document.querySelector('[aria-label="unlike this Restaurant"]'))
        .toBeTruthy();
    });

    it('should be able to like the restaurant', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      });
      document.querySelector('#likeButton').dispatchEvent(new Event('click'));
      const restaurants = await FavoriteRestaurantDB.getRestaurant(1);
      expect(restaurants).toEqual({id:1});
      FavoriteRestaurantDB.deleteRestaurants(1);
    });

    it('should not add a restaurants again when its already liked', async () => {
      await LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: 'rqdv5juczeskfw1e867',
        },
      });
      // Tambahkan restaurant dengan ID 1 ke daftar film yang disukai
    await FavoriteRestaurantDB.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantDB.getAllRestaurants()).toEqual([{ id: 1 }]);
    FavoriteRestaurantDB.deleteRestaurants(1);
  });
});