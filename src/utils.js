export const abbrNum = num => {
  const string = num.toString(); 
  const numLength = num.toString().length; 

  if(numLength <= 3) {
    return num;
  } else if(numLength > 3) {
    if(numLength === 4) {
      return `${string.substring(0, 1)}.${string.substring(1, 2)}K`;
    } else if(numLength === 5) {
      return `${string.substring(0, 2)}.${string.substring(2, 3)}K`; 
    } else if(numLength === 6){
      return `${string.substring(0, 3)}K`; 
    }
  }
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