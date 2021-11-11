export const abbrNum = num => {
  const string = num.toString(); 
  const numLength = num.toString().length; 

  if(numLength <= 3) {
    return num;
  } else if(numLength > 3) {
    if(numLength === 4) {
      return `${string.substring(0, 1)}.${string.substring(1, 2)}k`;
    } else if(numLength === 5) {
      return `${string.substring(0, 2)}.${string.substring(2, 3)}k`; 
    } else if(numLength === 6){
      return `${string.substring(0, 3)}k`; 
    }
  }
}

export const setArticlesArr = (articles, state) => {
  let articlesArr;

  if(articles === 'popular'){
    articlesArr = state.popularArticles; 
  } else if(articles === 'sport'){
    articlesArr = state.sportArticles; 
  } else if(articles === 'news'){
    articlesArr = state.newsArticles; 
  }

  return articlesArr; 
}

export const scoreFunc = (article, id, scored) => {
  if(article.id === id){
    if(!article.scoredUp && !article.scoredDown){
      if(scored === 'up'){
        article.score = article.score + 1;
        article.scoredUp = true;
      } else if(scored === 'down'){
        article.score = article.score - 1;
        article.scoredDown = true;
      }
    }  // if article not yet scored, and scored up, + 1 to score, scoredUp = true. if not yet scored and scored down, - 1 to score, scoredDown = true  

    else if(article.scoredUp && scored === 'down'){
      article.score = article.score - 2;
      article.scoredDown = true;
      article.scoredUp = false;
    }   // if article already been scored up, and scored is down, minus two from score to take it one below its original score. scoredDown = true, scoredUp = false

    else if(article.scoredDown && scored === 'up'){
      article.score = article.score + 2;
      article.scoredUp = true;
      article.scoredDown = false;
    }   // if article already been scored down, and scored is up, add two to score to take it one above its original score. scoredUp = true, scoredDown = false
  }

  else if(article.scoredDown && scored === 'down'){
    if(article.score <= 0){
      article.score = 0; 
    } 
  }  // if article already scored down and scored down again, if the first down made score less than or equal to 0, remains the same, score = 0. This condition doesn't allow a score of 0 to be set to -1. 
}

export const convertUnixTimeStamp = (timeStamp) => {
  // const unixTimestamp = timeStamp;
  const milliseconds = timeStamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString(); // 19/09/2021, 23:54:50

  // console.log(humanDateFormat.length);   // must be 20 to work

  const convertToDateObjTime = (string) => {
    const yr = string.substring(6, 10);  // 2021
    const month = string.substring(3, 5);  // 09
    const day = string.substring(0, 2);  // 19
    const time = string.substring(12, 20);  // 23:54:50
  
    return `${yr}-${month}-${day}T${time}`;
  }

  // const dateObjTime = convertToDateObjTime(humanDateFormat);

  const date = new Date(convertToDateObjTime(humanDateFormat));

  const timeSince = date => {

    const seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  return timeSince(date);
}