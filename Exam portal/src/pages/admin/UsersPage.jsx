import React, { useEffect, useState } from 'react';
import { Search, Filter, Users, Shield, GraduationCap, UserCheck, X, Plus, Trash2 } from 'lucide-react';
import { adminService } from '../../services/adminService';

const ROLE_COLORS = { ADMIN: 'role-admin', TEACHER: 'role-teacher', STUDENT: 'role-student' };
const STATUS_COLORS = { ACTIVE: 'badge-green', INACTIVE: 'badge-gray', SUSPENDED: 'badge-red' };

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ full_name: '', username: '', email: '', password_hash: '', role: 'STUDENT' });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = () => adminService.getUsers().then((u) => { setUsers(u); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleAddUser = async () => {
    if (!form.full_name || !form.email || !form.password_hash) return;
    setSaving(true);
    await adminService.addUser(form);
    await load(); setSaving(false); setShowModal(false);
    setForm({ full_name: '', username: '', email: '', password_hash: '', role: 'STUDENT' });
  };
  const handleDelete = async (id) => { await adminService.deleteUser(id); setDeleteConfirm(null); load(); };
  const handleStatusToggle = async (user) => {
    const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    await adminService.updateUserStatus(user.user_id, newStatus);
    load();
  };

  const filtered = users.filter((u) =>
    (u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.username?.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === '' || u.role === roleFilter) &&
    (statusFilter === '' || u.status === statusFilter)
  );

  const roleCounts = { ADMIN: users.filter(u => u.role === 'ADMIN').length, TEACHER: users.filter(u => u.role === 'TEACHER').length, STUDENT: users.filter(u => u.role === 'STUDENT').length };

  return (
    <div>
      <div className="page-header">
        <div><h1>User Directory</h1><p>Manage all system users — administrators, teachers, and students.</p></div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={() => setShowModal(true)} id="add-user-btn"><Plus size={16} /> Add User</button>
        </div>
      </div>

      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 20 }}>
        {[
          { label: 'Administrators', value: roleCounts.ADMIN, color: 'purple', icon: Shield },
          { label: 'Teachers', value: roleCounts.TEACHER, color: 'blue', icon: UserCheck },
          { label: 'Students', value: roleCounts.STUDENT, color: 'green', icon: GraduationCap },
        ].map((s) => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.color}`}><s.icon size={22} /></div>
            <div className="stat-content">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="table-container">
        <div className="table-toolbar">
          <div className="table-filters">
            <div className="search-box">
              <Search size={16} />
              <input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} id="user-search" />
            </div>
            <select className="form-select" style={{ width: 140 }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} id="user-role-filter">
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="TEACHER">Teacher</option>
              <option value="STUDENT">Student</option>
            </select>
            <select className="form-select" style={{ width: 140 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} id="user-status-filter">
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{filtered.length} users</span>
        </div>
        {loading ? <div className="loading-state"><div className="spinner" /></div>
          : (
            <div className="table-overflow">
              <table className="data-table">
                <thead>
                  <tr><th>Name</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.user_id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary), var(--primary-light))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0
                          }}>
                            {u.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <span style={{ fontWeight: 600 }}>{u.full_name}</span>
                        </div>
                      </td>
                      <td><code style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{u.username}</code></td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                      <td><span className={`badge ${ROLE_COLORS[u.role] || 'badge-gray'}`}>{u.role}</span></td>
                      <td><span className={`badge ${STATUS_COLORS[u.status] || 'badge-gray'}`}>{u.status}</span></td>
                      <td>
                        <div className="table-actions">
                          <button
                            className={`btn btn-sm ${u.status === 'ACTIVE' ? 'btn-warning' : 'btn-success'}`}
                            onClick={() => handleStatusToggle(u)}
                            title={u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                          >
                            {u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                          </button>
                          {u.role !== 'ADMIN' && (
                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteConfirm(u)} title="Delete">
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add New User</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}><X size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label required">Full Name</label><input className="form-input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Dr. / Prof. / Student Name" autoFocus id="user-name-input" /></div>
              <div className="grid-2">
                <div className="form-group"><label className="form-label required">Username</label><input className="form-input" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="johndoe" id="user-username-input" /></div>
                <div className="form-group"><label className="form-label required">Role</label>
                  <select className="form-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} id="user-role-select">
                    <option value="STUDENT">Student</option>
                    <option value="TEACHER">Teacher</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
              <div className="form-group"><label className="form-label required">Email</label><input className="form-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@university.edu" id="user-email-input" /></div>
              <div className="form-group"><label className="form-label required">Password</label><input className="form-input" type="password" value={form.password_hash} onChange={(e) => setForm({ ...form, password_hash: e.target.value })} placeholder="Minimum 8 characters" id="user-password-input" /></div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddUser} disabled={saving} id="save-user-btn">{saving ? 'Saving...' : 'Create User'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3 style={{ color: 'var(--danger)' }}>Delete User</h3><button className="modal-close" onClick={() => setDeleteConfirm(null)}><X size={18} /></button></div>
            <div className="modal-body"><div className="alert alert-error"><Trash2 size={18} /><div>Delete user <strong>{deleteConfirm.full_name}</strong>? This action is permanent.</div></div></div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm.user_id)} id="confirm-delete-user-btn"><Trash2 size={14} /> Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
