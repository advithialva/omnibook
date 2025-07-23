import { useTranslation } from 'react-i18next';
import { formatDate, formatNumber } from '../utils/formatters';

const BookCard = ({ book, onEdit, onDelete, onView, viewMode = 'grid' }) => {
  const { t, i18n } = useTranslation();

  const handleDelete = () => {
    if (window.confirm(t('messages.confirmDelete'))) {
      onDelete(book.id);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 
              className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition-colors duration-200 truncate"
              onClick={() => onView(book)}
            >
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{book.author}</p>
            {book.genre && (
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full mt-2">
                {t(`genres.${book.genre}`, book.genre)}
              </span>
            )}
          </div>
          
          <div className="ml-4 text-sm text-gray-500 space-y-1 min-w-0">
            {book.publishedDate && (
              <div className="flex items-center">
                <span className="w-16 flex-shrink-0 text-xs font-medium text-gray-400">Date:</span>
                <span className="ml-2">{formatDate(book.publishedDate, i18n.language)}</span>
              </div>
            )}
            {book.pages && (
              <div className="flex items-center">
                <span className="w-16 flex-shrink-0 text-xs font-medium text-gray-400">Pages:</span>
                <span className="ml-2">{formatNumber(book.pages, i18n.language)}</span>
              </div>
            )}
            {book.language && (
              <div className="flex items-center">
                <span className="w-16 flex-shrink-0 text-xs font-medium text-gray-400">Lang:</span>
                <span className="ml-2">{book.language}</span>
              </div>
            )}
          </div>

          <div className="ml-4 flex space-x-2">
            <button 
              className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200 cursor-pointer"
              onClick={() => onEdit(book)}
              title={t('buttons.edit')}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 cursor-pointer"
              onClick={handleDelete}
              title={t('buttons.delete')}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <h3 
          className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-primary-600 transition-colors duration-200 flex-1"
          onClick={() => onView(book)}
        >
          {book.title}
        </h3>
        <div className="ml-4 flex space-x-2">
          <button 
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200 cursor-pointer"
            onClick={() => onEdit(book)}
            title={t('buttons.edit')}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 cursor-pointer"
            onClick={handleDelete}
            title={t('buttons.delete')}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <span className="text-sm font-medium">{t('bookForm.author')}:</span>
          <span className="ml-2 text-sm">{book.author}</span>
        </div>
        
        {book.genre && (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-600">{t('bookForm.genre')}:</span>
            <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
              {t(`genres.${book.genre}`, book.genre)}
            </span>
          </div>
        )}
        
        {book.publishedDate && (
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{formatDate(book.publishedDate, i18n.language)}</span>
          </div>
        )}
        
        {book.pages && (
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-sm">{formatNumber(book.pages, i18n.language)} pages</span>
          </div>
        )}
        
        {book.isbn && (
          <div className="flex items-center text-gray-600">
            <span className="text-sm font-medium">ISBN:</span>
            <span className="ml-2 text-sm font-mono">{book.isbn}</span>
          </div>
        )}
      </div>
      
      {book.description && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-700 text-sm leading-relaxed">
            {book.description.length > 150 
              ? `${book.description.substring(0, 150)}...` 
              : book.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookCard;
