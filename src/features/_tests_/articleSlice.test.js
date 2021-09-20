import reducer, { fetchArticles } from '../articleSlice';
// import fetchMock from 'jest-fetch-mock';

describe('articleSlice tests', () => {

  const mockInitialState = {
    articles: [],
    articlesWithThumbnails: [],
    articlesWithoutThumbnails: [],
    isLoading: true,
    hasError: false
  }

  // const fetchPromiseResolve = jest.fn(() => {
  //   return Promise.resolve([
  //     {
  //       data: {
  //         id: 'pnrdxu',
  //         author: '2old-you',
  //         title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
  //         score: 81480,
  //         created: 1631577125,
  //         num_comments: 13551,
  //         thumbnail: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
  //         thumbnail_height: 140,
  //         thumbnail_width: 140,
  //       }
  //     }, 
  //     {
  //       data: {
  //         id: 'pnu0lx',
  //         author: 'purple-circle',
  //         title: '🔥 A hunter wakes up two sleeping caribou after a snowfall',
  //         score: 20490,
  //         created: 1631586720,
  //         num_comments: 654,
  //         thumbnail: "https://a.thumbs.redditmedia.com/UOQRrKmzQbxQjmKfzVSrK9AG3JtrycrA4C205EF9E-8.jpg",
  //         thumbnail_height: 140,
  //         thumbnail_width: 140,
  //       }
  //     },
  //     {
  //       data: {
  //         id: 'pnup99',
  //         author: 'Jonathan_408',
  //         title: 'This kitty\'s classical pose',
  //         score: 11732,
  //         created: 1631589316,
  //         num_comments: 45,
  //         thumbnail: "https://b.thumbs.redditmedia.com/4ywvJovD_JpbXIQCdU1j6BiM3L9WtCjR14_w9qBsbtI.jpg",
  //         thumbnail_height: 140,
  //         thumbnail_width: 140,
  //       }
  //     },
  //     {
  //       data: {
  //         id: "pnijr8",
  //         author: "FF-coolbeans",
  //         title: "What are you glad isn’t “cool” anymore?",
  //         score: 17294,
  //         created: 1631549387,
  //         num_comments: 11087,
  //       }
  //     }
  //   ]);
  // });

  const fetchPromise = jest.fn(() => {
    return Promise.resolve([
      {
        data: {
          id: 'pnrdxu',
          author: '2old-you',
          title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
          score: 81480,
          created: 1631577125,
          num_comments: 13551,
          thumbnail: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
          thumbnail_height: 140,
          thumbnail_width: 140,
        }
      }, 
      {
        data: {
          id: 'pnu0lx',
          author: 'purple-circle',
          title: '🔥 A hunter wakes up two sleeping caribou after a snowfall',
          score: 20490,
          created: 1631586720,
          num_comments: 654,
          thumbnail: "https://a.thumbs.redditmedia.com/UOQRrKmzQbxQjmKfzVSrK9AG3JtrycrA4C205EF9E-8.jpg",
          thumbnail_height: 140,
          thumbnail_width: 140,
        }
      },
      {
        data: {
          id: 'pnup99',
          author: 'Jonathan_408',
          title: 'This kitty\'s classical pose',
          score: 11732,
          created: 1631589316,
          num_comments: 45,
          thumbnail: "https://b.thumbs.redditmedia.com/4ywvJovD_JpbXIQCdU1j6BiM3L9WtCjR14_w9qBsbtI.jpg",
          thumbnail_height: 140,
          thumbnail_width: 140,
        }
      },
      {
        data: {
          id: "pnijr8",
          author: "FF-coolbeans",
          title: "What are you glad isn’t “cool” anymore?",
          score: 17294,
          created: 1631549387,
          num_comments: 11087,
        }
      }
    ])
  });

  afterEach(jest.clearAllMocks); 

  it('initialState is as expected', () => {
    expect(reducer(undefined, {})).toEqual(mockInitialState);
    expect.assertions(1);
  });

  it('interpretation of returned data is correct', async () => {
    const result = await fetchPromise();

    expect(result[0].data.id).toBe('pnrdxu'); 
    expect(result[0].data.author).toBe('2old-you'); 
    expect(result[1].data.title).toBe('🔥 A hunter wakes up two sleeping caribou after a snowfall'); 
    expect(result[1].data.score).toBe(20490); 
    expect(result[2].data.created).toBe(1631589316); 
    expect(result[2].data.num_comments).toBe(45); 
    expect(result[0].data.thumbnail).toBe("https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg"); 
    expect(result[1].data.thumbnail_height).toBe(140); 
    expect(result[2].data.thumbnail_width).toBe(140); 
    
    expect(fetchPromise).toHaveBeenCalledTimes(1); 
    expect.assertions(10);
  });

  it('state.articles,state.articlesWithThumbnails, state.articlesWithoutThumbnails store data correctly', async () => {
    const result = await fetchPromise(); 

    result.forEach(article => {
      mockInitialState.articles.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created, numComments: article.data.num_comments });

      article.data.thumbnail && article.data.thumbnail.includes('https') ? mockInitialState.articlesWithThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created, numComments: article.data.num_comments, thumbnail: article.data.thumbnail, thumbnailHeight: article.data.thumbnail_height, thumbnailWidth: article.data.thumbnail_width }) : mockInitialState.articlesWithoutThumbnails.push({ id: article.data.id, author: article.data.author, title: article.data.title, score: article.data.score, created: article.data.created, numComments: article.data.num_comments });
    });

    expect(mockInitialState.articles).toEqual([
      {
        id: 'pnrdxu',
        author: '2old-you',
        title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
        score: 81480,
        created: 1631577125,
        numComments: 13551,
      }, 
      {
        id: 'pnu0lx',
        author: 'purple-circle',
        title: '🔥 A hunter wakes up two sleeping caribou after a snowfall',
        score: 20490,
        created: 1631586720,
        numComments: 654,
      },
      {
        id: 'pnup99',
        author: 'Jonathan_408',
        title: 'This kitty\'s classical pose',
        score: 11732,
        created: 1631589316,
        numComments: 45,
      },
      {
        id: "pnijr8",
          author: "FF-coolbeans",
          title: "What are you glad isn’t “cool” anymore?",
          score: 17294,
          created: 1631549387,
          numComments: 11087,
      }
    ]);

    expect(mockInitialState.articlesWithThumbnails).toEqual([
      {
        id: 'pnrdxu',
        author: '2old-you',
        title: 'AOC is at the Met Gala. The back of her dress reads "TAX THE RICH."',
        score: 81480,
        created: 1631577125,
        numComments: 13551,
        thumbnail: "https://b.thumbs.redditmedia.com/tJfASDgoMM3bJVCZX-Qi73w3LEOG2s5vrMsrdrV9SPc.jpg",
        thumbnailHeight: 140,
        thumbnailWidth: 140, 
      }, 
      {
        id: 'pnu0lx',
        author: 'purple-circle',
        title: '🔥 A hunter wakes up two sleeping caribou after a snowfall',
        score: 20490,
        created: 1631586720,
        numComments: 654,
        thumbnail: "https://a.thumbs.redditmedia.com/UOQRrKmzQbxQjmKfzVSrK9AG3JtrycrA4C205EF9E-8.jpg",
        thumbnailHeight: 140,
        thumbnailWidth: 140, 
      },
      {
        id: 'pnup99',
        author: 'Jonathan_408',
        title: 'This kitty\'s classical pose',
        score: 11732,
        created: 1631589316,
        numComments: 45,
        thumbnail: "https://b.thumbs.redditmedia.com/4ywvJovD_JpbXIQCdU1j6BiM3L9WtCjR14_w9qBsbtI.jpg",
        thumbnailHeight: 140,
        thumbnailWidth: 140, 
      },
    ]);

    expect(mockInitialState.articlesWithoutThumbnails).toEqual([
      {
        id: "pnijr8",
        author: "FF-coolbeans",
        title: "What are you glad isn’t “cool” anymore?",
        score: 17294,
        created: 1631549387,
        numComments: 11087,
      }
    ]);

    expect(fetchPromise).toHaveBeenCalledTimes(1); 
    expect.assertions(4); 
  });

  it('works with async/await and resolves', async () => {
    const promise = await fetchPromise();

    expect(promise).toBeTruthy();
    expect(promise[0].data.id).toEqual('pnrdxu');
    expect(promise[1].data.id).toEqual('pnu0lx');

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