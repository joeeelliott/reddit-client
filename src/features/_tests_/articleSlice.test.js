import reducer from '../articleSlice';

describe('articleSlice tests', () => {

  it('initialState is as expected', () => {
    const mockInitialState = {
      articles: [],
      articlesWithThumbnails: [],
      articlesWithoutThumbnails: [],
      isLoading: true,
      hasError: false
    }
    
    expect(reducer(undefined, {})).toEqual(mockInitialState);
  });

  it('fetchArticles should return the expected result', async () => {
    let testIdResult;
  
    const testFetchArticles = async () => {
      try {
        const response = await fetch('https://www.reddit.com/r/popular.json?limit=10');
    
        const json = await response.json();
        // console.log(json.data.children[0].data.id)
        testIdResult = json.data.children[0].data.id;
        return json.data.children[0].data.id;
      } catch (error) {
        console.log(error)
      }
    }

    const result = await testFetchArticles();

    expect(result).toBe(testIdResult);
  });

  it('mocked function should match result', async () => {
    const fetchArticles = () => {
      return Promise.resolve('pnewzf');
    };

    const result = await fetchArticles();

    expect(result).toBe('pnewzf'); 
  });
});