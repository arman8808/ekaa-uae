import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Eye, Pencil, Trash2, RefreshCw, Search, Filter } from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { adminUtils } from '../../utils/adminUtils';
import { useNavigate } from 'react-router-dom';
import { managedEventsService } from '../../services/managedEventsService';

const EVENT_OPTIONS = [
  {
    value: 'AWAKEN THE LIMITLESS HUMAN',
    label: 'AWAKEN THE LIMITLESS HUMAN',
    hasLevels: true,
    levels: [
      'Level 1 | Basic Integrated Hypnosis Training',
      'Level 2 | Advanced Module for Behavioral Resolutions',
      'Level 3 | Advanced Modalities for Health Resolutions',
      'Level 4 | Metaphysical Hypnosis Training',
      'Level 5 | Hypnosis Training through Integrated Healing',
      'Level 6 | Advanced Module in Inner Child Healing',
    ],
  },
  {
    value: 'Decode',
    label: 'Decode',
    hasLevels: true,
    levels: [
      'Decode Your Mind',
      'Decode Your Behaviour',
      'Decode Your Relationships',
      'Decode Your Blue Print',
    ],
  },
  {
    value: 'TASSO',
    label: 'TASSO',
    hasLevels: true,
    levels: [
      'Module 1',
      'Module 2',
      'Module 3',
      'Module 4',
      'Module 5',
      'Module 6',
    ],
  },
  { value: 'Family Constellation', label: 'Family Constellation', hasLevels: false },
];

const ManageEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(null);

  const [form, setForm] = useState({
    eventName: '',
    level: '',
    startDate: '',
    endDate: '',
    location: '',
    conductedBy: '',
    totalParticipants: '',
    programFees: '',
    statusBoolean: true,
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async (page = 1) => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const resp = await managedEventsService.getManagedEvents({ page, limit: itemsPerPage, search: searchTerm });
      if (!resp.success) throw new Error(resp.error || 'Failed to load events');
      const list = Array.isArray(resp.data?.data) ? resp.data.data : Array.isArray(resp.data?.events) ? resp.data.events : Array.isArray(resp.data) ? resp.data : [];
      const pagination = resp.data?.pagination || { totalPages: resp.data?.totalPages, total: resp.data?.total };
      setEvents(list);
      setViewRows(list);
      setTotalCount(pagination.total ?? list.length);
      setTotalPages(pagination.totalPages ?? Math.max(1, Math.ceil((pagination.total ?? list.length) / itemsPerPage)));
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const [viewRows, setViewRows] = useState([]);

  const handleSearch = (e) => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    const value = e.target.value;
    setSearchTerm(value);
    const timeout = setTimeout(() => fetchEvents(1), 400);
    return () => clearTimeout(timeout);
  };

  const handlePageChange = (page) => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    fetchEvents(page);
  };

  const selectedEventMeta = useMemo(() => EVENT_OPTIONS.find((e) => e.value === form.eventName), [form.eventName]);

  const openAddModal = () => {
    setEditingEventId(null);
    setForm({ eventName: '', level: '', startDate: '', endDate: '', location: '', conductedBy: '', totalParticipants: '', programFees: '', statusBoolean: true });
    setFormErrors({});
    setShowModal(true);
  };

  const openEditModal = (row) => {
    console.log(row,'row');
    setEditingEventId(row._id);
    setForm({
      eventName: row.event || row.eventName || '',
      level: row.level || '',
      startDate: row.startDate ? String(row.startDate).substring(0, 10) : '',
      endDate: row.endDate ? String(row.endDate).substring(0, 10) : '',
      location: row.location || '',
      conductedBy: row.conductedBy || '',
      totalParticipants: (row.totalParticipants ?? '') === '' ? '' : String(row.totalParticipants),
      programFees: row.programFees || '',
      statusBoolean: (row.status ? String(row.status).toLowerCase() === 'open' : true),
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    setDeleteEventId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteEventId) return;
    const resp = await managedEventsService.softDeleteManagedEvent(deleteEventId);
    if (!resp.success) {
      alert(resp.error || 'Failed to delete');
      return;
    }
    setShowDeleteModal(false);
    setDeleteEventId(null);
    fetchEvents(Math.min(currentPage, totalPages));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminUtils.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    const errors = {};
    if (!form.eventName) errors.eventName = 'Event is required';
    if (selectedEventMeta?.hasLevels && !form.level) errors.level = 'Level is required';
    if (!form.startDate) errors.startDate = 'Start date is required';
    if (!form.endDate) errors.endDate = 'End date is required';
    if (form.startDate && form.endDate && new Date(form.endDate) < new Date(form.startDate)) {
      errors.endDate = 'End date must be on or after start date';
    }
    if (!form.location) errors.location = 'Location is required';
    if (!form.conductedBy) errors.conductedBy = 'Conducted By is required';
    if (form.totalParticipants !== '' && Number(form.totalParticipants) < 0) errors.totalParticipants = 'Total participants cannot be negative';
    if (!form.programFees && form.programFees !== 0) errors.programFees = 'Program fees is required';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    const payload = {
      event: form.eventName,
      level: selectedEventMeta?.hasLevels ? form.level : '',
      startDate: form.startDate,
      endDate: form.endDate,
      location: form.location,
      conductedBy: form.conductedBy,
      totalParticipants: form.totalParticipants === '' ? 0 : Number(form.totalParticipants),
      programFees: form.programFees,
      status: form.statusBoolean ? 'Open' : 'Closed',
      isActive: !!form.statusBoolean,
    };
    const resp = editingEventId
      ? await managedEventsService.updateManagedEvent(editingEventId, payload)
      : await managedEventsService.createManagedEvent(payload);
    if (!resp.success) {
      alert(resp.error || 'Failed to save event');
      return;
    }
    setShowModal(false);
    fetchEvents(1);
  };

  if (!adminUtils.isLoggedIn()) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#6E2D79]">Manage Events</h1>
              <p className="text-gray-600 mt-1">Total Events: {totalCount}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openAddModal}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
              <button
                onClick={() => fetchEvents(currentPage)}
                disabled={loading}
                className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
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
                placeholder="Search by event, level, location, or conductor..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-5 h-5" />
              <span className="text-sm">Found: {totalCount} results</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#6E2D79] text-white">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-semibold">Event</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden md:table-cell">Level</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Start Date</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">End Date</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden lg:table-cell">Location</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Conducted By</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden sm:table-cell">Total Participants</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Program Fees</th>
                  <th className="px-4 py-4 text-left text-sm font-semibold hidden xl:table-cell">Status</th>
                  <th className="px-4 py-4 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {viewRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-[#5C2166]">{row.event || row.eventName}</div>
                      <div className="text-xs text-gray-500 md:hidden">{row.level || '—'}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">{row.level || '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">{row.startDate ? String(row.startDate).substring(0,10) : '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">{row.endDate ? String(row.endDate).substring(0,10) : '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden lg:table-cell">{row.location || '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">{row.conductedBy || '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">{row.totalParticipants ?? '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">{row.programFees || '—'}</td>
                    <td className="px-4 py-4 text-sm text-gray-900 hidden xl:table-cell">{row.status || (row.isActive ? 'Open' : 'Closed') || '—'}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setViewEvent(row);
                            setShowViewModal(true);
                          }}
                          className="bg-[#6E2D79] text-white p-2 rounded-lg hover:bg-[#5C2166] transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openEditModal(row)}
                          className="bg-gray-100 text-gray-800 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(row._id)}
                          className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {viewRows.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No events found</div>
              <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-2 rounded-lg ${
                          currentPage === pageNum ? 'bg-[#6E2D79] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg z-[500]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{editingEventId ? 'Edit Event' : 'Add Event'}</h2>
                  <button onClick={() => setShowModal(false)} className="text-white hover:text-gray-200 text-2xl">×</button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Event</label>
                    <select
                      value={form.eventName}
                      onChange={(e) => {
                        const next = e.target.value;
                        setForm((f) => ({ ...f, eventName: next, level: '' }));
                      }}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    >
                      <option value="" disabled>Select Event</option>
                      {EVENT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  {selectedEventMeta?.hasLevels && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Level</label>
                      <select
                        value={form.level}
                        onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                      >
                        <option value="" disabled>Select Level</option>
                        {selectedEventMeta.levels?.map((lvl) => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                      {formErrors.level && (<p className="text-sm text-red-600">{formErrors.level}</p>)}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    />
                    {formErrors.startDate && (<p className="text-sm text-red-600">{formErrors.startDate}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={form.endDate}
                      onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    />
                    {formErrors.endDate && (<p className="text-sm text-red-600">{formErrors.endDate}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    />
                    {formErrors.location && (<p className="text-sm text-red-600">{formErrors.location}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Conducted By</label>
                    <input
                      type="text"
                      value={form.conductedBy}
                      onChange={(e) => setForm((f) => ({ ...f, conductedBy: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    />
                    {formErrors.conductedBy && (<p className="text-sm text-red-600">{formErrors.conductedBy}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Total Participants</label>
                    <input
                      type="number"
                      min="0"
                      value={form.totalParticipants}
                      onChange={(e) => setForm((f) => ({ ...f, totalParticipants: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    />
                    {formErrors.totalParticipants && (<p className="text-sm text-red-600">{formErrors.totalParticipants}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Program Fees</label>
                    <input
                      type="text"
                      value={form.programFees}
                      onChange={(e) => setForm((f) => ({ ...f, programFees: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    />
                    {formErrors.programFees && (<p className="text-sm text-red-600">{formErrors.programFees}</p>)}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={form.statusBoolean ? 'active' : 'inactive'}
                      onChange={(e) => setForm((f) => ({ ...f, statusBoolean: e.target.value === 'active' }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6E2D79] focus:border-transparent outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                  <button type="submit" className="bg-[#6E2D79] text-white px-4 py-2 rounded-lg hover:bg-[#5C2166] transition-colors">{editingEventId ? 'Update' : 'Add'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showViewModal && viewEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg z-[500]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">View Event</h2>
                  <button onClick={() => setShowViewModal(false)} className="text-white hover:text-gray-200 text-2xl">×</button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Event</p>
                    <p className="font-medium text-gray-900">{viewEvent.event || viewEvent.eventName || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Level</p>
                    <p className="font-medium text-gray-900">{viewEvent.level || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium text-gray-900">{viewEvent.startDate ? String(viewEvent.startDate).substring(0,10) : '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium text-gray-900">{viewEvent.endDate ? String(viewEvent.endDate).substring(0,10) : '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium text-gray-900">{viewEvent.location || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conducted By</p>
                    <p className="font-medium text-gray-900">{viewEvent.conductedBy || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Participants</p>
                    <p className="font-medium text-gray-900">{viewEvent.totalParticipants ?? '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Program Fees</p>
                    <p className="font-medium text-gray-900">{viewEvent.programFees || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">{viewEvent.status || (viewEvent.isActive ? 'Open' : 'Closed') || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="sticky top-0 bg-[#6E2D79] text-white p-6 rounded-t-lg z-[500]">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Delete Event</h2>
                  <button onClick={() => setShowDeleteModal(false)} className="text-white hover:text-gray-200 text-2xl">×</button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-gray-800">Are you sure you want to delete this event?</p>
                <div className="flex items-center justify-end gap-3">
                  <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                  <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageEvents;


