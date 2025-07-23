import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './BookDetailModal';

const BookForm = ({ isOpen, onClose, onSave, book = null, mode = 'add' }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    publishedDate: '',
    pages: '',
    description: '',
    language: '',
    publisher: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        genre: book.genre || '',
        publishedDate: book.publishedDate || '',
        pages: book.pages || '',
        description: book.description || '',
        language: book.language || '',
        publisher: book.publisher || ''
      });
    } else {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        genre: '',
        publishedDate: '',
        pages: '',
        description: '',
        language: '',
        publisher: ''
      });
    }
    setErrors({});
  }, [book, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = t('validation.required');
    } else if (formData.title.length < 2) {
      newErrors.title = t('validation.minLength', { count: 2 });
    }

    if (!formData.author.trim()) {
      newErrors.author = t('validation.required');
    } else if (formData.author.length < 2) {
      newErrors.author = t('validation.minLength', { count: 2 });
    }

    if (formData.isbn && !/^(\d{10}|\d{13})$/.test(formData.isbn.replace(/[-\s]/g, ''))) {
      newErrors.isbn = t('validation.invalidISBN');
    }

    if (formData.pages && (isNaN(formData.pages) || parseInt(formData.pages) < 1)) {
      newErrors.pages = 'Please enter a valid number of pages';
    }

    if (formData.publishedDate && new Date(formData.publishedDate) > new Date()) {
      newErrors.publishedDate = 'Published date cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookData = {
        ...formData,
        pages: formData.pages ? parseInt(formData.pages) : null,
        id: book?.id || Date.now() // Simple ID generation for demo
      };

      await onSave(bookData);
      onClose();
    } catch (error) {
      console.error('Error saving book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const genres = [
    'fiction', 'nonFiction', 'mystery', 'romance', 'scienceFiction', 
    'fantasy', 'biography', 'history', 'selfHelp', 'technology', 'philosophy'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Japanese', 'Chinese', 'Korean', 'Hindi', 'Arabic', 'Russian'
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === 'edit' ? t('bookForm.editTitle') : t('bookForm.addTitle')}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.title')} *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`block w-full rounded-lg border-2 px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500/20 ${
                errors.title 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-primary-500 bg-gray-50 hover:bg-white'
              }`}
              placeholder={t('bookForm.title')}
            />
            {errors.title && <p className="text-xs text-red-600 font-medium">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="author" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.author')} *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`block w-full rounded-lg border-2 px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500/20 ${
                errors.author 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-primary-500 bg-gray-50 hover:bg-white'
              }`}
              placeholder={t('bookForm.author')}
            />
            {errors.author && <p className="text-xs text-red-600 font-medium">{errors.author}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="isbn" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.isbn')}
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              className={`block w-full rounded-lg border-2 px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500/20 ${
                errors.isbn 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-primary-500 bg-gray-50 hover:bg-white'
              }`}
              placeholder="978-0-123456-78-9"
            />
            {errors.isbn && <p className="text-xs text-red-600 font-medium">{errors.isbn}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="genre" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.genre')}
            </label>
            <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm bg-gray-50 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 hover:bg-white"
            >
              <option value="">{t('bookForm.genre')}</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {t(`genres.${genre}`, genre)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="publishedDate" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.publishedDate')}
            </label>
            <input
              type="date"
              id="publishedDate"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              className={`block w-full rounded-lg border-2 px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500/20 ${
                errors.publishedDate 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-primary-500 bg-gray-50 hover:bg-white'
              }`}
            />
            {errors.publishedDate && <p className="text-xs text-red-600 font-medium">{errors.publishedDate}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="pages" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.pages')}
            </label>
            <input
              type="number"
              id="pages"
              name="pages"
              value={formData.pages}
              onChange={handleChange}
              className={`block w-full rounded-lg border-2 px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-primary-500/20 ${
                errors.pages 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : 'border-gray-200 focus:border-primary-500 bg-gray-50 hover:bg-white'
              }`}
              min="1"
              placeholder="Enter number of pages"
            />
            {errors.pages && <p className="text-xs text-red-600 font-medium">{errors.pages}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="language" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.language')}
            </label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm bg-gray-50 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 hover:bg-white"
            >
              <option value="">Select language</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="publisher" className="block text-xs font-semibold text-gray-800">
              {t('bookForm.publisher')}
            </label>
            <input
              type="text"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm bg-gray-50 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 hover:bg-white"
              placeholder="Enter publisher name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-xs font-semibold text-gray-800">
            {t('bookForm.description')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm bg-gray-50 transition-all duration-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 hover:bg-white resize-none"
            rows="3"
            placeholder="Enter book description (optional)"
          />
        </div>

        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 cursor-pointer"
            disabled={isSubmitting}
          >
            {t('buttons.cancel')}
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('messages.loading')}
              </div>
            ) : (
              t('buttons.save')
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookForm;
