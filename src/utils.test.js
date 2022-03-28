import { abbrNum, setPostsArr, convertUnixTimeStamp, sortSpecificsFilter, miniSortArr } from './utils';

describe('utils.js', () => {

  let mockInitialState;

  beforeEach(() => {
    mockInitialState = {
      allPosts: [], 
      popularPosts: [{
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
      }],
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
      specificsSortedArray: [{
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
      }],
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
  });

  it('abbreviates numbers correctly', () => {
    const result = abbrNum(123);
    const result2 = abbrNum(1234);
    const result3 = abbrNum(12345);
    const result4 = abbrNum(123456);

    expect(result).toBe(123);
    expect(result2).toBe('1.2k');
    expect(result3).toBe('12.3k');
    expect(result4).toBe('123k');
  });

  it('sets the correct post array', () => {
    const postArr = setPostsArr('popular', mockInitialState);
    expect(postArr).toEqual([{
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
    }]);
  });

  it('sets the time correctly', () => {
    const hoursAgo = convertUnixTimeStamp(1648435301);
    const daysAgo = convertUnixTimeStamp(1648240804);
    const monthsAgo = convertUnixTimeStamp(1637701734);

    const hours = convertUnixTimeStamp(1648435301).toString().substring(0, 2); 
    const days = convertUnixTimeStamp(1648240804).toString().substring(0, 1); 
    const months = convertUnixTimeStamp(1637701734).toString().substring(0, 1); 

    expect(hoursAgo).toBe(`${hours} hours ago`);
    expect(daysAgo).toBe(`${days} days ago`);
    expect(monthsAgo).toBe(`${months} months ago`);
  });

  it('miniSortArr works as expected', () => {
    const scoreHighToLow = miniSortArr({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'Score (High to Low');

    expect(scoreHighToLow).toEqual({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }] });

    const scoreLowToHigh = miniSortArr({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'Score (Low to High)');

    expect(scoreLowToHigh).toEqual({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 50, created: 1637701734, numComments: 5 }, { score: 100, created: 1648435301, numComments: 10 }] });

    const postedRecentToOld = miniSortArr({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'Posted (Most Recent to Oldest');

    expect(postedRecentToOld).toEqual({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }] });

    const postedOldestToRecent = miniSortArr({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'Posted (Oldest to Most Recent)');

    expect(postedOldestToRecent).toEqual({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 50, created: 1637701734, numComments: 5 }, { score: 100, created: 1648435301, numComments: 10 }] });

    const numCommentsHighToLow = miniSortArr({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'No. of Comments (High to Low)');

    expect(numCommentsHighToLow).toEqual({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }] });

    const numCommentsLowToHigh = miniSortArr({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'No. of Comments (Low to High)');

    expect(numCommentsLowToHigh).toEqual({ isSearching: false, searchedPosts: [], specificsSortedArray: [{ score: 50, created: 1637701734, numComments: 5 }, { score: 100, created: 1648435301, numComments: 10 }] });

    const searchedPostsScoreHighToLow = miniSortArr({ isSearching: true, searchedPosts: [{ score: 50, created: 1637701734, numComments: 5 }, { score: 100, created: 1648435301, numComments: 10 }], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }]}, 'Score (High to Low)');

    expect(searchedPostsScoreHighToLow).toEqual({ isSearching: true, searchedPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }], specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }] });
  });

  it('sorts specificsFilter array as expected', () => {
    const popularFilterScoreHighToLow = sortSpecificsFilter(
      {
        popularPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
        sportPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
        newsPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
        specificsSortedArray: [],
        isSearching: false, 
        searchedPosts: [],
      }, 
    'Score (High To Low)', 'Popular', '');

    expect(popularFilterScoreHighToLow).toEqual({
      popularPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
      sportPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
      newsPosts: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
      specificsSortedArray: [{ score: 100, created: 1648435301, numComments: 10 }, { score: 50, created: 1637701734, numComments: 5 }],
      isSearching: false, 
      searchedPosts: [],
    });

    const allPostFilterCommentsLowToHigh = sortSpecificsFilter(
      {
        allPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }, { score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }, { score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
        popularPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }],
        sportPosts: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
        newsPosts: [{ score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
        specificsSortedArray: [],
        isSearching: false, 
        searchedPosts: [],
      }, 
    'No. of Comments (Low To High)', 'All', '');

    expect(allPostFilterCommentsLowToHigh).toEqual({
      allPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }, { score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }, { score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
      popularPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }],
      sportPosts: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
      newsPosts: [{ score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
      specificsSortedArray: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }, { score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }, { score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
      isSearching: false, 
      searchedPosts: [],
    });

    const noPostFilterScoreHighToLowSportRoute = sortSpecificsFilter(
      {
        popularPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }],
        sportPosts: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
        newsPosts: [{ score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
        specificsSortedArray: [],
        isSearching: false, 
        searchedPosts: [],
      }, 
    'Score (High To Low)', '', 'sport');
  
    expect(noPostFilterScoreHighToLowSportRoute).toEqual({
      popularPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }],
      sportPosts: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
      newsPosts: [{ score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
      specificsSortedArray: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
      isSearching: false, 
      searchedPosts: [],
    });
  
    const noPostFilterSearchModeCreatedOldToNew = sortSpecificsFilter(
      {
        popularPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }],
        sportPosts: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
        newsPosts: [{ score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
        specificsSortedArray: [],
        isSearching: true, 
        searchedPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }, { score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }, { score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
      }, 
    'Posted (Oldest to Most Recent)', '', '');
  
    expect(noPostFilterSearchModeCreatedOldToNew).toEqual({
      popularPosts: [{ score: 10, created: 1648435301, numComments: 5 }, { score: 20, created: 1637701734, numComments: 10 }],
      sportPosts: [{ score: 30, created: 1648435302, numComments: 15 }, { score: 40, created: 1637701735, numComments: 20 }],
      newsPosts: [{ score: 50, created: 1648435303, numComments: 25 }, { score: 60, created: 1637701736, numComments: 30 }],
      specificsSortedArray: [],
      isSearching: true, 
      searchedPosts: [{ score: 20, created: 1637701734, numComments: 10 }, { score: 40, created: 1637701735, numComments: 20 }, { score: 60, created: 1637701736, numComments: 30 }, { score: 10, created: 1648435301, numComments: 5 }, { score: 30, created: 1648435302, numComments: 15 }, { score: 50, created: 1648435303, numComments: 25 }],
    });
  });
});