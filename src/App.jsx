import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import BookCard from './components/BookCard';
import BookDetailModal from './components/BookDetailModal';
import BookForm from './components/BookForm';
import { formatNumber } from './utils/formatters';
import { sampleBooks, getBookStats } from './data/books';

function App() {
  const { t, i18n } = useTranslation();
  const [books, setBooks] = useState(sampleBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); 

  // Get book statistics
  const bookStats = getBookStats(books);

  // Filter books based on search term and genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    
    return matchesSearch && matchesGenre;
  });

  // Sort filtered books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle date sorting
    if (sortBy === 'publishedDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    // Handle numeric sorting
    if (sortBy === 'pages') {
      aValue = parseInt(aValue) || 0;
      bValue = parseInt(bValue) || 0;
    }
    
    // Handle string sorting
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleEdit = (book) => {
    setEditingBook(book);
    setIsFormModalOpen(true);
  };

  const handleDelete = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId));
    toast.success(t('messages.bookDeleted'));
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleAddBook = () => {
    setEditingBook(null);
    setIsFormModalOpen(true);
  };

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      // Update existing book
      setBooks(books.map(book => 
        book.id === editingBook.id ? { ...bookData, id: editingBook.id } : book
      ));
      toast.success(t('messages.bookUpdated'));
    } else {
      // Add new book
      setBooks([...books, { ...bookData, id: Date.now() }]);
      toast.success(t('messages.bookAdded'));
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedGenre('all');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(books, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'books-export.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Books exported successfully!');
  };

  const genres = ['all', 'fiction', 'nonFiction', 'mystery', 'romance', 'scienceFiction', 'fantasy', 'biography', 'history', 'selfHelp', 'technology', 'philosophy'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                {t('stats.totalBooks', { count: books.length })}
              </h3>
              <p className="text-3xl font-bold text-primary-600">
                {formatNumber(books.length, i18n.language)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                {t('stats.totalPages', { count: bookStats.totalPages })}
              </h3>
              <p className="text-3xl font-bold text-primary-600">
                {formatNumber(bookStats.totalPages, i18n.language)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                {t('stats.averagePages')}
              </h3>
              <p className="text-3xl font-bold text-primary-600">
                {formatNumber(bookStats.averagePages, i18n.language)}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 text-center">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                {t('stats.mostPopularGenre')}
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {t(`genres.${bookStats.mostPopularGenre}`, bookStats.mostPopularGenre)}
              </p>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  placeholder={t('books.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
                {searchTerm && (
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setSearchTerm('')}
                    title={t('buttons.clear')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="block w-full lg:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>
                    {genre === 'all' ? t('filters.all') : t(`genres.${genre}`, genre)}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                >
                  <option value="title">{t('filters.sortOptions.title')}</option>
                  <option value="author">{t('filters.sortOptions.author')}</option>
                  <option value="publishedDate">{t('filters.sortOptions.publishedDate')}</option>
                  <option value="pages">{t('filters.sortOptions.pages')}</option>
                </select>
                
                <button
                  className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {sortOrder === 'asc' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500' 
                      : 'text-primary-600 border border-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500'
                  }`}
                  onClick={() => setViewMode('grid')}
                  title="Grid View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer ${
                    viewMode === 'list' 
                      ? 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500' 
                      : 'text-primary-600 border border-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500'
                  }`}
                  onClick={() => setViewMode('list')}
                  title="List View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 cursor-pointer"
                  onClick={handleAddBook}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  {t('books.addNew')}
                </button>
                
                {(searchTerm || selectedGenre !== 'all') && (
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer"
                    onClick={handleClearSearch}
                  >
                    {t('buttons.clear')} {t('filters.filters')}
                  </button>
                )}

                <button
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-600 border border-primary-600 rounded-md hover:bg-primary-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 cursor-pointer"
                  onClick={handleExportData}
                  title="Export Books Data"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  {t('buttons.export')}
                </button>
              </div>
            </div>
          </div>

          {/* Books Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">{t('books.title')}</h2>
              <div className="text-sm text-gray-500">
                {t('stats.totalBooks', { count: sortedBooks.length })} 
                {searchTerm || selectedGenre !== 'all' ? ` (filtered)` : ''}
              </div>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">{t('messages.loading')}</p>
              </div>
            ) : sortedBooks.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No books found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || selectedGenre !== 'all' 
                    ? 'No books match your search criteria'
                    : t('books.noBooks')
                  }
                </p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {sortedBooks.map(book => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onView={handleView}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BookForm
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveBook}
        book={editingBook}
        mode={editingBook ? 'edit' : 'add'}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#333',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid #e5e7eb',
          },
          success: {
            style: {
              border: '1px solid #10b981',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
