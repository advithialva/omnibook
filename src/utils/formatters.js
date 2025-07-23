// Date and number formatting utilities
export const formatDate = (date, locale = 'en', options = {}) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const formatOptions = { ...defaultOptions, ...options };
  
  try {
    return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateObj.toLocaleDateString();
  }
};

export const formatNumber = (number, locale = 'en', options = {}) => {
  if (typeof number !== 'number') return number;
  
  try {
    return new Intl.NumberFormat(locale, options).format(number);
  } catch (error) {
    console.error('Error formatting number:', error);
    return number.toString();
  }
};

export const formatCurrency = (amount, currency = 'USD', locale = 'en') => {
  return formatNumber(amount, locale, {
    style: 'currency',
    currency: currency
  });
};

// Format relative time like "2 days ago"
export const formatRelativeTime = (date, locale = 'en') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now - dateObj;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    
    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return rtf.format(-diffInMinutes, 'minute');
      }
      return rtf.format(-diffInHours, 'hour');
    }
    
    if (diffInDays < 30) {
      return rtf.format(-diffInDays, 'day');
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return rtf.format(-diffInMonths, 'month');
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    return rtf.format(-diffInYears, 'year');
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return formatDate(dateObj, locale);
  }
};

// HTML date input format helpers
export const getDateInputFormat = (locale = 'en') => {
  return 'YYYY-MM-DD'; // HTML standard
};

export const toDateInputValue = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toISOString().split('T')[0];
};
