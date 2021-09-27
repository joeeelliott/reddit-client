import reducer from '../articleSlice';
// import fetchMock from 'jest-fetch-mock';

describe('articleSlice tests', () => {

  let result; 
  let mockInitialState; 
  let fetchPromise;
  // let fetchPopularPromise; 
  // let fetchTrendingPromise;
  // let fetchSportPromise;
  // let fetchNewsPromise;

  beforeEach( async () => {
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
  });

  afterEach(jest.clearAllMocks); 

  it('initialState is as expected', () => {
    expect(reducer(undefined, {})).toEqual(mockInitialState);
    expect.assertions(1);
  });

  it('interpretation of returned data is correct', async () => {

    expect(result[0].data.id).toBe('pnrdxu'); 
    expect(result[0].data.author).toBe('2old-you'); 
    expect(result[1].data.title).toBe('What are you glad isn’t “cool” anymore?'); 
    expect(result[1].data.score).toBe(17294); 
    expect(result[0].data.created_utc).toBe(1631577125); 
    expect(result[0].data.num_comments).toBe(13551); 
    expect(result[1].data.thumbnail).toBe("self"); 
    expect(result[1].data.thumbnail_height).toBe(null); 
    expect(result[0].data.thumbnail_width).toBe(140); 
    expect(result[0].data.url).toBe("https://www.reddit.com/r/pics/comments/pnrdxu/aoc_is_at_the_met_gala_the_back_of_her_dress/")
    expect(result[0].data.media).toStrictEqual({
      reddit_video: {
        "bitrate_kbbs": 2400,
        "dash_url": "https://url",
      }
    });
    expect(result[1].data.media).toBe(null);
    expect(result[1].data.media_embed).toStrictEqual({});
    
    expect(fetchPromise).toHaveBeenCalledTimes(1); 
    expect.assertions(14);
  });

  it('all article arrays store data correctly', async () => {
    result.forEach(article => {
      mockInitialState.popularArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
        url: article.data.thumbnail,
        height: article.data.thumbnail_height, 
        width: article.data.thumbnail_width, 
      }
      });

      mockInitialState.trendingArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url
      });

      mockInitialState.sportArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
        url: article.data.thumbnail,
        height: article.data.thumbnail_height, 
        width: article.data.thumbnail_width, 
      },
      media: article.data.media, mediaEmbed: article.data.media_embed
      });

      mockInitialState.newsArticles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created_utc, numComments: article.data.num_comments, url: article.data.url, thumbnail: {
        url: article.data.thumbnail,
        height: article.data.thumbnail_height, 
        width: article.data.thumbnail_width, 
      }
      });
    });

    expect(mockInitialState.popularArticles).toEqual([
      {
        id: 'pnrdxu',
        author: '2old-you',
        title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
        score: 81480,
        created: 1631577125,
        numComments: 13551,
        url: "https://www.reddit.com/r/pics/comments/pnrdxu/aoc_is_at_the_met_gala_the_back_of_her_dress/", 
        thumbnail: {
          url: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
          height: 140,
          width: 140,
        },
      }, 
      {
        id: "pnijr8",
        author: "FF-coolbeans",
        title: "What are you glad isn’t “cool” anymore?",
        score: 17294,
        created: 1631549387,
        numComments: 11087,
        url: "https://www.reddit.com/r/AskReddit/comments/pnijr8/what_are_you_glad_isnt_cool_anymore/",
        thumbnail: {
          url: "self",
          height: null,
          width: undefined,
        },
      },
    ]);

    expect(mockInitialState.trendingArticles).toEqual([
      {
        id: 'pnrdxu',
        author: '2old-you',
        title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
        score: 81480,
        created: 1631577125,
        numComments: 13551,
        url: "https://www.reddit.com/r/pics/comments/pnrdxu/aoc_is_at_the_met_gala_the_back_of_her_dress/", 
      }, 
      {
        id: "pnijr8",
        author: "FF-coolbeans",
        title: "What are you glad isn’t “cool” anymore?",
        score: 17294,
        created: 1631549387,
        numComments: 11087,
        url: "https://www.reddit.com/r/AskReddit/comments/pnijr8/what_are_you_glad_isnt_cool_anymore/",
      },
    ]);

    expect(mockInitialState.sportArticles).toEqual([
      {
        id: 'pnrdxu',
        author: '2old-you',
        title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
        score: 81480,
        created: 1631577125,
        numComments: 13551,
        url: "https://www.reddit.com/r/pics/comments/pnrdxu/aoc_is_at_the_met_gala_the_back_of_her_dress/", 
        thumbnail: {
          url: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
          height: 140,
          width: 140,
        },
        media: {
          "reddit_video": {
            "bitrate_kbbs": 2400,
            "dash_url": "https://url",
          }
        },
        mediaEmbed: {}, 
      },
      {
        id: "pnijr8",
        author: "FF-coolbeans",
        title: "What are you glad isn’t “cool” anymore?",
        score: 17294,
        created: 1631549387,
        numComments: 11087,
        url: "https://www.reddit.com/r/AskReddit/comments/pnijr8/what_are_you_glad_isnt_cool_anymore/",
        thumbnail: {
          url: "self",
          height: null,
          width: undefined,
        },
        media: null,
        mediaEmbed: {},
      },
    ]);

    expect(mockInitialState.newsArticles).toEqual([
      {
        id: 'pnrdxu',
        author: '2old-you',
        title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
        score: 81480,
        created: 1631577125,
        numComments: 13551,
        url: "https://www.reddit.com/r/pics/comments/pnrdxu/aoc_is_at_the_met_gala_the_back_of_her_dress/", 
        thumbnail: {
          url: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
          height: 140,
          width: 140,
        },
      },
      {
        id: "pnijr8",
        author: "FF-coolbeans",
        title: "What are you glad isn’t “cool” anymore?",
        score: 17294,
        created: 1631549387,
        numComments: 11087,
        url: "https://www.reddit.com/r/AskReddit/comments/pnijr8/what_are_you_glad_isnt_cool_anymore/",
        thumbnail: {
          url: "self",
          height: null,
          width: undefined,
        },
      },
    ]);

    expect(fetchPromise).toHaveBeenCalledTimes(1); 
    expect.assertions(5); 
  });

  it('works with async/await and resolves', async () => {

    expect(result).toBeTruthy();
    expect(result[0].data.id).toEqual('pnrdxu');
    expect(result[1].data.id).toEqual('pnijr8');

    expect(fetchPromise).toHaveBeenCalledTimes(1); 
    expect.assertions(4)
  });

  it('tests error with async/await', async () => {
    const rejectPromise = jest.fn(() => {
      try {
        return Promise.reject(new Error('data not found')); 
      } catch(e) {
        return e; 
      }
    })

    await expect(rejectPromise()).rejects.toThrow('data not found'); 

    expect(rejectPromise).toHaveBeenCalledTimes(1);
    expect.assertions(2);
  });

  it('tests error with async/await and rejects', async () => {
    const fetchPromiseReject = jest.fn(() => {
      return Promise.reject({ error: 'data not found'});
    });

    try {
      await fetchPromiseReject();
    } catch (e) {
      expect(e).toEqual({ error: 'data not found' }); 
    }

    expect(fetchPromiseReject).toHaveBeenCalledTimes(1); 
    expect.assertions(2); 
  });  
});