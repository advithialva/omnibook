import { useTranslation } from 'react-i18next';
import { formatDate, formatNumber } from '../utils/formatters';

const Modal = ({ isOpen, onClose, children, title }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Enhanced blurred and dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-lg backdrop-saturate-150 transition-all duration-500" 
        onClick={handleOverlayClick}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        }}
      ></div>
      <div className="relative w-full max-w-lg mx-4 z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200 animate-fadeIn transform transition-all duration-300 hover:shadow-3xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              {title}
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 cursor-pointer"
              onClick={onClose}
              aria-label={t('buttons.close')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="pt-2 pb-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookDetailModal = ({ book, isOpen, onClose, onEdit, onDelete }) => {
  const { t, i18n } = useTranslation();

  if (!book) return null;

  const handleDelete = () => {
    if (window.confirm(t('messages.confirmDelete'))) {
      onDelete(book.id);
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={t('books.details')}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <h3 className="text-xl font-semibold text-gray-900 flex-1 min-w-0 pr-4">{book.title}</h3>
          <div className="flex space-x-2 flex-shrink-0">
            <button 
              className="px-3 py-2 text-sm font-medium text-primary-700 bg-primary-100 border border-transparent rounded-md hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 cursor-pointer whitespace-nowrap"
              onClick={() => onEdit(book)}
            >
              {t('buttons.edit')}
            </button>
            <button 
              className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer whitespace-nowrap"
              onClick={handleDelete}
            >
              {t('buttons.delete')}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-500 w-24">{t('bookForm.author')}:</span>
              <span className="text-sm text-gray-900 ml-2">{book.author}</span>
            </div>
            
            {book.genre && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">{t('bookForm.genre')}:</span>
                <span className="ml-2 inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                  {t(`genres.${book.genre}`, book.genre)}
                </span>
              </div>
            )}
            
            {book.publishedDate && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">{t('bookForm.publishedDate')}:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {formatDate(book.publishedDate, i18n.language)}
                </span>
              </div>
            )}
            
            {book.pages && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">{t('bookForm.pages')}:</span>
                <span className="text-sm text-gray-900 ml-2">
                  {formatNumber(book.pages, i18n.language)}
                </span>
              </div>
            )}
            
            {book.isbn && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">ISBN:</span>
                <span className="text-sm text-gray-900 font-mono ml-2">{book.isbn}</span>
              </div>
            )}
            
            {book.publisher && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">{t('bookForm.publisher')}:</span>
                <span className="text-sm text-gray-900 ml-2">{book.publisher}</span>
              </div>
            )}
            
            {book.language && (
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-500 w-24">{t('bookForm.language')}:</span>
                <span className="text-sm text-gray-900 ml-2">{book.language}</span>
              </div>
            )}
          </div>
          
          {book.description && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">{t('bookForm.description')}</h4>
              <p className="text-sm text-gray-700 leading-relaxed">{book.description}</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BookDetailModal;
export { Modal };
