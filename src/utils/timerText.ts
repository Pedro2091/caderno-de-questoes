export default function timerText(milliseconds:number){
    const seconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(seconds / 3600); 
    const minutes = Math.floor((seconds % 3600) / 60); 
    const remainingSeconds = seconds % 60;
  
    let timeString = '';
  
    if (hours > 0) {
      timeString += `${hours} hora${hours > 1 ? 's' : ''}`;
    }
  
    if (minutes > 0) {
      if (timeString) timeString += ' e '; 
      timeString += `${minutes} min${minutes > 1 ? 's' : ''}`;
    }
  
    if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
      if (timeString) timeString += ' e '; 
      timeString += `${remainingSeconds} segundo${remainingSeconds !== 1 ? 's' : ''}`;
    }
  
    return timeString || '0 segundos';
}