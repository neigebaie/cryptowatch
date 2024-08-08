export function formatAgo(date: Date, lang = "fr") {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `il y a ${diffInMinutes} min`;
  }

  if (diffInHours < 24) {
    return `il y a ${diffInHours}h`;
  }

  const yearNow = now.getFullYear();
  const yearDate = date.getFullYear();

  if (yearNow === yearDate) {
    return (
      "le " +
      new Intl.DateTimeFormat(lang, {
        day: "numeric",
        month: "short",
      }).format(date)
    );
  }

  const formatter = new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return "le " + formatter.format(date);
}

export function formatNumber(number: number, precision: number = 0) {
  if (number < 1000) {
    return number.toFixed(precision);
  } else if (number < 10000) {
    return (
      (Math.trunc(number / 100) / 10).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + "k"
    );
  } else if (number < 1000000) {
    return Math.trunc(number / 1000).toLocaleString() + "k";
  } else if (number < 1000000000) {
    return (
      (number / 1000000).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + "M"
    );
  } else {
    return (
      (number / 1000000000).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + "Md"
    );
  }
}