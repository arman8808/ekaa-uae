import React, { useEffect, useMemo, useState } from 'react';
import { Eye, RefreshCw, AlertCircle, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { adminUtils } from '../../utils/adminUtils';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const AdminContacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    fetchContacts(1);
  }, [navigate]);

  const fetchContacts = async (page = 1) => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get('/contacts');
      if (!response.success) throw new Error(response.error || 'Failed to fetch contacts');
      const data = response.data;
      const list = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      setContacts(list);
      const total = data?.pagination?.total ?? list.length;
      setTotalCount(total);
      setTotalPages(Math.max(1, Math.ceil(total / itemsPerPage)));
      setCurrentPage(page);
    } catch (err) {
      setError(err.message || 'Failed to fetch contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return contacts.filter((c) =>
      (c.fullName || '').toLowerCase().includes(lower) ||
      (c.email || '').toLowerCase().includes(lower) ||
      (c.country || '').toLowerCase().includes(lower) ||
      (c.phoneNumber || '').includes(searchTerm)
    );
  }, [contacts, searchTerm]);

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredContacts.slice(start, start + itemsPerPage);
  }, [filteredContacts, currentPage]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const viewDetails = (contact) => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    setSelectedContact(contact);
    setShowModal(true);
  };

  if (!adminUtils.isLoggedIn()) return null;

  if (loading && contacts.length === 0) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#6E2D79]" />
            <span className="text-[#6E2D79] font-medium">Loading contacts...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error && contacts.length === 0) {
    return (
      <AdminLayout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <button onClick={() => fetchContacts(1)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">Contact Submissions</h1>
              <p className="text-gray-600 mt-1">Total Contacts: {filteredContacts.length}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => fetchContacts(currentPage)} disabled={loading} className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, country, or phone..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="text-sm">Found: {filteredContacts.length} results</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#6E2D79] text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Email</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Phone</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Country</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Date</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pageRows.map((contact, index) => (
                  <tr key={contact._id || index} className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-[#5C2166]">{contact.fullName}</div>
                      <div className="text-xs text-gray-500 md:hidden">{contact.email}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">{contact.email}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">{contact.phoneNumber}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">{contact.country}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">{formatDate(contact.createdAt)}</td>
                    <td className="px-4 py-4 text-center">
                      <button onClick={() => viewDetails(contact)} className="bg-[#6E2D79] text-white p-2 rounded-lg hover:bg-[#5C2166] transition-colors" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pageRows.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No contacts found</div>
              <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredContacts.length)} of {filteredContacts.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => handlePageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">Previous</button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`px-3 py-2 rounded-lg ${currentPage === pageNum ? 'bg-[#6E2D79] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{pageNum}</button>
                    );
                  })}
                </div>
                <button onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        )}

        {showModal && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg z-[500]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Contact Details</h2>
                  <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200 text-2xl">×</button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedContact.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{selectedContact.phoneNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium text-gray-900">{selectedContact.country || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Message</p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedContact.message || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
};

export default AdminContacts;


