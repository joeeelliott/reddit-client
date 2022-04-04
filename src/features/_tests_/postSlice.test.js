import reducer from '../postSlice';

describe('postSlice.js', () => {
  let result; 
  let mockInitialState; 
  let fetchPromise;

  beforeEach( async () => {
    mockInitialState = {
      allPosts: [], 
      popularPosts: [],
      sportPosts: [],
      newsPosts: [],
      savedPosts: [],
      hiddenPosts: [],
      reportedPosts: [],
      dataLoading: true, 
      allPostsShown: true,
      ellipsisClicked: false, 
      reportModal: false,
      modalClosed: true,
      imgClicked: false,
      searchedPostsFound: false,
      searchedPosts: [],
      isSearching: false,
      searchText: "",
      popularHasError: false,
      sportHasError: false,
      newsHasError: false,
      filterMode: false,
      postFilter: '',
      specificFilter: '',
      specificsSortedArray: [],
      postFiltersArr: [
        { filter: 'All', checked: false, posts: 0 },
        { filter: 'Popular', checked: false, posts: 0 },
        { filter: 'Sport', checked: false, posts: 0 },
        { filter: 'News', checked: false, posts: 0 },
        { filter: 'Saved', checked: false, posts: 0 },
        { filter: 'Hidden', checked: false, posts: 0 },
        { filter: 'Reported', checked: false, posts: 0 },
      ],
      specificsFiltersArr: [
        { filter: 'Score', order: '(High to Low)', checked: false }, 
        { filter: 'Score', order: '(Low to High)', checked: false }, 
        { filter: 'Posted', order: '(Most Recent to Oldest)', checked: false }, 
        { filter: 'Posted', order: '(Oldest to Most Recent)', checked: false }, 
        { filter: 'No. of Comments', order: '(High to Low)', checked: false }, 
        { filter: 'No. of Comments', order: '(Low to High)', checked: false },
      ],
    }

    fetchPromise = jest.fn(() => {
      return Promise.resolve([
        {
          data: {
            id: 't33bgl',
            author: 'mred6453',
            title: 'What\'s not a drug but is so addictive that it could be classified as one?',
            score: 7731,
            created_utc: 1646011670,
            num_comments: 5201,
            permalink: '/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/',
            url: 'https://www.reddit.com/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/',
            thumbnail: 'self',
            thumbnail_height: null,
            thumbnail_width: null,
          }
        }, 
        {
          data: {
            id: 't39fce',
            author: 'Olya_roo',
            title: '[OC] We did it. We crossed the border',
            score: 46993,
            created_utc: 1646031385,
            num_comments: 721,
            permalink: '/r/pics/comments/t39fce/oc_we_did_it_we_crossed_the_border/',
            url: 'https://i.redd.it/050gbf5vuik81.jpg',
            thumbnail: 'https://b.thumbs.redditmedia.com/-65lnuoYNqu1-dPWAHqRZetLsgzHIyJdU-XpyB7mvpE.jpg',
            thumbnail_height: 140,
            thumbnail_width: 140,
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

  it('interpretation of returned API data is correct', () => {

    expect(result[0].data.id).toBe('t33bgl'); 
    expect(result[1].data.author).toBe('Olya_roo'); 
    expect(result[0].data.title).toBe('What\'s not a drug but is so addictive that it could be classified as one?'); 
    expect(result[1].data.score).toBe(46993); 
    expect(result[0].data.created_utc).toBe(1646011670); 
    expect(result[1].data.num_comments).toBe(721); 
    expect(result[0].data.permalink).toBe('/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/');
    expect(result[1].data.url).toBe('https://i.redd.it/050gbf5vuik81.jpg');
    expect(result[0].data.thumbnail).toBe('self'); 
    expect(result[1].data.thumbnail_height).toBe(140); 
    expect(result[0].data.thumbnail_width).toBe(null); 
   
    expect(fetchPromise).toHaveBeenCalledTimes(1); 

    expect.assertions(12);
  });

  it('fetched data is stored in state correctly', () => {
    result.forEach(post => {
      mockInitialState.allPosts.push({ 
        id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: { url: post.data.thumbnail, height: post.data.thumbnail_height, width: post.data.thumbnail_width }, saved: false, hidden: false, reported: false, scoredUp: false, scoredDown: false, postType: 'popular', imgClicked: false, inSearch: false,
      });

      mockInitialState.popularPosts.push({ 
        id: post.data.id, author: post.data.author, title: post.data.title, score: post.data.score, created: post.data.created_utc, numComments: post.data.num_comments, permalink: `https://www.reddit.com${post.data.permalink}`, url: post.data.url, thumbnail: { url: post.data.thumbnail, height: post.data.thumbnail_height, width: post.data.thumbnail_width }, saved: false, hidden: false, reported: false, scoredUp: false, scoredDown: false, postType: 'popular', imgClicked: false, inSearch: false,
      });
    });

    expect(mockInitialState.allPosts).toEqual([
      {
        id: 't33bgl',
        author: 'mred6453',
        title: 'What\'s not a drug but is so addictive that it could be classified as one?',
        score: 7731,
        created: 1646011670,
        numComments: 5201,
        permalink: 'https://www.reddit.com/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/',
        url: 'https://www.reddit.com/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/',
        thumbnail: {
          url: 'self',
          height: null,
          width: null,
        },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        postType: 'popular',
        imgClicked: false, 
        inSearch: false,
      }, 
      {
        id: "t39fce",
        author: 'Olya_roo',
        title: '[OC] We did it. We crossed the border',
        score: 46993,
        created: 1646031385,
        numComments: 721,
        permalink: 'https://www.reddit.com/r/pics/comments/t39fce/oc_we_did_it_we_crossed_the_border/',
        url: 'https://i.redd.it/050gbf5vuik81.jpg',
        thumbnail: {
          url: 'https://b.thumbs.redditmedia.com/-65lnuoYNqu1-dPWAHqRZetLsgzHIyJdU-XpyB7mvpE.jpg',
          height: 140,
          width: 140,
        },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        postType: 'popular',
        imgClicked: false, 
        inSearch: false,
      },
    ]);

    expect(mockInitialState.popularPosts).toEqual([
      {
        id: 't33bgl',
        author: 'mred6453',
        title: 'What\'s not a drug but is so addictive that it could be classified as one?',
        score: 7731,
        created: 1646011670,
        numComments: 5201,
        permalink: 'https://www.reddit.com/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/',
        url: 'https://www.reddit.com/r/AskReddit/comments/t33bgl/whats_not_a_drug_but_is_so_addictive_that_it/',
        thumbnail: {
          url: 'self',
          height: null,
          width: null,
        },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        postType: 'popular',
        imgClicked: false, 
        inSearch: false,
      }, 
      {
        id: "t39fce",
        author: 'Olya_roo',
        title: '[OC] We did it. We crossed the border',
        score: 46993,
        created: 1646031385,
        numComments: 721,
        permalink: 'https://www.reddit.com/r/pics/comments/t39fce/oc_we_did_it_we_crossed_the_border/',
        url: 'https://i.redd.it/050gbf5vuik81.jpg',
        thumbnail: {
          url: 'https://b.thumbs.redditmedia.com/-65lnuoYNqu1-dPWAHqRZetLsgzHIyJdU-XpyB7mvpE.jpg',
          height: 140,
          width: 140,
        },
        saved: false,
        hidden: false,
        reported: false,
        scoredUp: false,
        scoredDown: false,
        postType: 'popular',
        imgClicked: false, 
        inSearch: false,
      },
    ]);

    expect(fetchPromise).toHaveBeenCalledTimes(1); 

    expect.assertions(3); 
  });

  it('promise works with async/await and resolves', () => {

    expect(result).toBeTruthy();
    expect(result[0].data.id).toEqual('t33bgl');
    expect(result[1].data.id).toEqual('t39fce');

    expect(fetchPromise).toHaveBeenCalledTimes(1); 

    expect.assertions(4);
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