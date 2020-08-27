
// Alert
export const customAlert = (message: string) => {
  alert(message);
}

// Format Date
export const getFormatDate = (date: Date) => {
  let year = date.getFullYear();
  let month: string | number = (1 + date.getMonth());
  month = month >= 10 ? month : '0' + month;
  let day: string | number = date.getDate();
  day = day >= 10 ? day : '0' + day;
  return  year + '-' + month + '-' + day;
}