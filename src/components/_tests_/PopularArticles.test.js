import React from 'react'; 
import { Provider } from 'react-redux';
import PopularArticles from '../PopularArticles'; 
import { selectPopularArticle } from '../../features/articleSlice'; 
import { useSelector } from 'react-redux';

import { render as rtlRender, screen, fireEvent, cleanup, renderer } from '@testing-library/react'; 
import { store } from '../../app/store';

const render = component => rtlRender(
  <Provider store={store}>   
    {component}
  </Provider>
);

describe('PopularArticles Component', () => {
  
  let component;
  // let popularArticles;

  let mockInitialState; 
  let fetchPromise;
  let result; 

  beforeEach(async () => {

    mockInitialState = {
      popularArticles: [],
      trendingArticles: [],
      sportArticles: [],
      newsArticles: [],
      dataLoading: true, 
      popularHasError: false,
      trendingHasError: false,
      sportHasError: false,
      newsHasError: false,
    }

    fetchPromise = jest.fn(() => {
      return Promise.resolve([
        {
          data: {
            id: 'pnrdxu',
            author: '2old-you',
            title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
            score: 81480,
            created_utc: 1631577125,
            num_comments: 13551,
            thumbnail: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
            thumbnail_height: 140,
            thumbnail_width: 140,
            url: "https://www.reddit.com/r/pics/comments/pnrdxu/aoc_is_at_the_met_gala_the_back_of_her_dress/",
            media: {
              reddit_video: {
                bitrate_kbbs: 2400,
                dash_url: "https://url",
              }
            },
            media_embed: {},
          }
        }, 
        {
          data: {
            id: "pnijr8",
            author: "FF-coolbeans",
            title: "What are you glad isn’t “cool” anymore?",
            score: 17294,
            created_utc: 1631549387,
            num_comments: 11087,
            thumbnail: "self",
            thumbnail_height: null,
            thumbnail_width: undefined,
            url: "https://www.reddit.com/r/AskReddit/comments/pnijr8/what_are_you_glad_isnt_cool_anymore/",
            media: null,
            media_embed: {},
          }
        }
      ])
    });
  
    result = await fetchPromise();

    component = render(<PopularArticles />);
  });

  it('renders in as expected; matches snapshot', () => {
    result.forEach(article => {
      mockInitialState.popularArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
        url: article.data.thumbnail,
        height: article.data.thumbnail_height, 
        width: article.data.thumbnail_width, 
      }
      });
    });
    expect(component).toMatchSnapshot(); 
  });
});