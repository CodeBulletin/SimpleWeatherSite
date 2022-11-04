export const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();    
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours %= 12;
    hours = hours || 12;   
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  
    const strTime = `${hours}:${minutes} ${ampm}`;
  
    return strTime;
};

export const timeCmp = (now, time) => {
    let tc = time - now;
    let tm = Math.abs(tc) / (1000 * 60)
    let th = tm / 60;

    if(th < 1) {
        if (tc < 0) {
            return `${Math.round(Math.abs(tm))} mins ago`;
        }
    
        return `in ${Math.round(Math.abs(tm))} mins`;
    }

    if (tc < 0) {
        return `${Math.round(Math.abs(th))} hrs ago`;
    }

    return `in ${Math.round(Math.abs(th))} hrs`;
}

export const timeCmpW = (time) => {
    return timeCmp(Date.now(), new Date(time * 1000));
} 