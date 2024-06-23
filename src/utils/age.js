export default function getAge(date) {
  if (typeof date !== "string") {
    return;
  }

  const today = new Date();
  const birth = new Date(date);

  let years = today.getFullYear() - birth.getFullYear();

  const monthDiff = birth.getMonth() - today.getMonth();
  if (monthDiff > 0 || (monthDiff === 0 && birth.getDay() > today.getDay())) {
    years--;
  }
  
  return years;
}
