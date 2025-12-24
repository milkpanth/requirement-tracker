import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';

function App() {
  const [activeSheet, setActiveSheet] = useState('tracking');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [requirements, setRequirements] = useState([
    {
      id: 'REQ-001',
      source: 'Initial',
      initial: 'ระบบต้องสามารถบันทึกข้อมูลลูกค้าได้',
      additional: 'เพิ่มการตรวจสอบข้อมูลซ้ำ, เพิ่มฟิลด์สำหรับเบอร์โทรสำรอง',
      final: 'ระบบบันทึกข้อมูลลูกค้าพร้อมตรวจสอบข้อมูลซ้ำและรองรับเบอร์โทรสำรอง',
      reason: 'เพื่อป้องกันข้อมูลซ้ำและเพิ่มช่องทางติดต่อสำรอง',
      priority: 'High',
      status: 'Completed',
      owner: 'Team A',
      deliveryDate: '2025-01-15'
    },
    {
      id: 'REQ-002',
      source: 'Initial',
      initial: 'สามารถพิมพ์รายงานได้',
      additional: 'เพิ่ม Export เป็น PDF และ Excel',
      final: 'ระบบรองรับการพิมพ์และ Export รายงานเป็น PDF/Excel',
      reason: 'ลูกค้าต้องการความยืดหยุ่นในการใช้งานข้อมูล',
      priority: 'Medium',
      status: 'In Progress',
      owner: 'Team B',
      deliveryDate: '2025-01-20'
    },
    {
      id: 'REQ-003',
      source: 'Additional',
      initial: '-',
      additional: 'ระบบแจ้งเตือนผ่าน Email เมื่อมีการอัพเดทข้อมูลสำคัญ',
      final: 'ระบบส่ง Email แจ้งเตือนอัตโนมัติพร้อม Log การส่ง',
      reason: 'เพื่อให้ผู้ใช้ติดตามข้อมูลได้ทันท่วงที',
      priority: 'High',
      status: 'Pending',
      owner: 'Team A',
      deliveryDate: '2025-01-25'
    }
  ]);

  const [changeLog, setChangeLog] = useState([
    {
      date: '2024-12-01',
      reqId: 'REQ-001',
      changeType: 'Added',
      description: 'เพิ่มการตรวจสอบข้อมูลซ้ำ',
      requestedBy: 'คุณสมชาย (ลูกค้า)',
      approvedBy: 'PM'
    },
    {
      date: '2024-12-05',
      reqId: 'REQ-002',
      changeType: 'Modified',
      description: 'เปลี่ยนจากพิมพ์เท่านั้น เป็น Export หลายรูปแบบ',
      requestedBy: 'ทีมพัฒนา',
      approvedBy: 'PM'
    },
    {
      date: '2024-12-10',
      reqId: 'REQ-003',
      changeType: 'New',
      description: 'เพิ่ม requirement ใหม่สำหรับการแจ้งเตือน',
      requestedBy: 'คุณสมศรี (ลูกค้า)',
      approvedBy: 'PM'
    }
  ]);

  const [newReq, setNewReq] = useState({
    source: 'Additional',
    initial: '',
    additional: '',
    final: '',
    reason: '',
    priority: 'Medium',
    status: 'Pending',
    owner: '',
    deliveryDate: ''
  });

  const summary = {
    total: requirements.length,
    initial: requirements.filter(r => r.source === 'Initial').length,
    additional: requirements.filter(r => r.source === 'Additional').length,
    completed: requirements.filter(r => r.status === 'Completed').length,
    inProgress: requirements.filter(r => r.status === 'In Progress').length,
    pending: requirements.filter(r => r.status === 'Pending').length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source) => {
    switch(source) {
      case 'Initial': return 'bg-yellow-50';
      case 'Additional': return 'bg-green-50';
      default: return 'bg-white';
    }
  };

  const downloadAsCSV = () => {
    const headers = ['ID', 'Source', 'Initial Requirement', 'Additional Requirements', 'Final Requirement', 'Reason', 'Priority', 'Status', 'Owner', 'Delivery Date'];
    const csvContent = [
      headers.join(','),
      ...requirements.map(req => 
        [req.id, req.source, req.initial, req.additional, req.final, req.reason, req.priority, req.status, req.owner, req.deliveryDate]
          .map(field => `"${field}"`)
          .join(',')
      )
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'requirements_tracking.csv';
    link.click();
  };

  const addNewRequirement = () => {
    const newId = `REQ-${String(requirements.length + 1).padStart(3, '0')}`;
    setRequirements([...requirements, { id: newId, ...newReq }]);
    setNewReq({
      source: 'Additional',
      initial: '',
      additional: '',
      final: '',
      reason: '',
      priority: 'Medium',
      status: 'Pending',
      owner: '',
      deliveryDate: ''
    });
    setShowAddForm(false);
  };

  const deleteRequirement = (id) => {
    if (window.confirm('คุณต้องการลบ Requirement นี้หรือไม่?')) {
      setRequirements(requirements.filter(req => req.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Requirements Tracking System</h1>
            <p className="text-blue-100">ระบบติดตามและจัดการ Requirements</p>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 border-b flex">
            <button
              onClick={() => setActiveSheet('summary')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSheet === 'summary'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveSheet('tracking')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSheet === 'tracking'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              📋 Requirements Tracking
            </button>
            <button
              onClick={() => setActiveSheet('changelog')}
              className={`px-6 py-3 font-medium transition-colors ${
                activeSheet === 'changelog'
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              📝 Change Log
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Summary Sheet */}
            {activeSheet === 'summary' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">สรุปภาพรวมโปรเจกต์</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="text-sm font-medium text-blue-600 mb-1">Total Requirements</div>
                    <div className="text-3xl font-bold text-blue-900">{summary.total}</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="text-sm font-medium text-yellow-600 mb-1">Initial Requirements</div>
                    <div className="text-3xl font-bold text-yellow-900">{summary.initial}</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="text-sm font-medium text-green-600 mb-1">Additional Requirements</div>
                    <div className="text-3xl font-bold text-green-900">{summary.additional}</div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">สถานะการดำเนินงาน</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-700">Completed</span>
                      <span className="text-2xl font-bold text-green-600">{summary.completed}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-700">In Progress</span>
                      <span className="text-2xl font-bold text-blue-600">{summary.inProgress}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-gray-700">Pending</span>
                      <span className="text-2xl font-bold text-yellow-600">{summary.pending}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">📌 Color Coding Guide</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-50 border border-yellow-200 rounded"></div>
                      <span className="text-gray-700">Initial Requirements จากลูกค้า</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-50 border border-green-200 rounded"></div>
                      <span className="text-gray-700">Additional Requirements ที่เพิ่มเติม</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Requirements Tracking Sheet */}
            {activeSheet === 'tracking' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Requirements Tracking</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowAddForm(!showAddForm)}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus size={18} />
                      เพิ่ม Requirement
                    </button>
                    <button
                      onClick={downloadAsCSV}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Download size={18} />
                      Export CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {showAddForm && (
                    <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">เพิ่ม Requirement ใหม่</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                          <select
                            value={newReq.source}
                            onChange={(e) => setNewReq({...newReq, source: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Initial">Initial</option>
                            <option value="Additional">Additional</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            value={newReq.priority}
                            onChange={(e) => setNewReq({...newReq, priority: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                          <select
                            value={newReq.status}
                            onChange={(e) => setNewReq({...newReq, status: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                          <input
                            type="text"
                            value={newReq.owner}
                            onChange={(e) => setNewReq({...newReq, owner: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="ทีมหรือชื่อผู้รับผิดชอบ"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Requirement</label>
                          <textarea
                            value={newReq.initial}
                            onChange={(e) => setNewReq({...newReq, initial: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="Requirement เริ่มต้นจากลูกค้า"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                          <textarea
                            value={newReq.additional}
                            onChange={(e) => setNewReq({...newReq, additional: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="Requirements ที่เพิ่มเติม"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Final Requirement *</label>
                          <textarea
                            value={newReq.final}
                            onChange={(e) => setNewReq({...newReq, final: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="Requirement สุดท้ายที่ทำจริง"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Change</label>
                          <textarea
                            value={newReq.reason}
                            onChange={(e) => setNewReq({...newReq, reason: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="เหตุผลที่มีการเปลี่ยนแปลง"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                          <input
                            type="date"
                            value={newReq.deliveryDate}
                            onChange={(e) => setNewReq({...newReq, deliveryDate: e.target.value})}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={addNewRequirement}
                          disabled={!newReq.final}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          บันทึก
                        </button>
                        <button
                          onClick={() => setShowAddForm(false)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-800 text-white">
                        <th className="p-3 text-left text-sm font-semibold">ID</th>
                        <th className="p-3 text-left text-sm font-semibold">Source</th>
                        <th className="p-3 text-left text-sm font-semibold min-w-48">Initial Requirement</th>
                        <th className="p-3 text-left text-sm font-semibold min-w-48">Additional Requirements</th>
                        <th className="p-3 text-left text-sm font-semibold min-w-48">Final Requirement</th>
                        <th className="p-3 text-left text-sm font-semibold min-w-48">Reason for Change</th>
                        <th className="p-3 text-left text-sm font-semibold">Priority</th>
                        <th className="p-3 text-left text-sm font-semibold">Status</th>
                        <th className="p-3 text-left text-sm font-semibold">Owner</th>
                        <th className="p-3 text-left text-sm font-semibold">Delivery Date</th>
                        <th className="p-3 text-left text-sm font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requirements.map((req) => (
                        <tr key={req.id} className={`border-b hover:bg-gray-50 ${getSourceColor(req.source)}`}>
                          <td className="p-3 font-medium text-gray-900">{req.id}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              req.source === 'Initial' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                            }`}>
                              {req.source}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-700">{req.initial || '-'}</td>
                          <td className="p-3 text-sm text-gray-700">{req.additional || '-'}</td>
                          <td className="p-3 text-sm text-gray-700 font-medium">{req.final}</td>
                          <td className="p-3 text-sm text-gray-600">{req.reason}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(req.priority)}`}>
                              {req.priority}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(req.status)}`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-700">{req.owner}</td>
                          <td className="p-3 text-sm text-gray-700">{req.deliveryDate}</td>
                          <td className="p-3">
                            <button
                              onClick={() => deleteRequirement(req.id)}
                              className="text-red-600 hover:text-red-800 p-1"
                              title="ลบ"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Change Log Sheet */}
            {activeSheet === 'changelog' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Change Log</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-800 text-white">
                        <th className="p-3 text-left text-sm font-semibold">Date</th>
                        <th className="p-3 text-left text-sm font-semibold">Req ID</th>
                        <th className="p-3 text-left text-sm font-semibold">Change Type</th>
                        <th className="p-3 text-left text-sm font-semibold">Description</th>
                        <th className="p-3 text-left text-sm font-semibold">Requested By</th>
                        <th className="p-3 text-left text-sm font-semibold">Approved By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {changeLog.map((log, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 text-sm text-gray-700">{log.date}</td>
                          <td className="p-3 font-medium text-blue-600">{log.reqId}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              log.changeType === 'New' ? 'bg-green-100 text-green-800' :
                              log.changeType === 'Modified' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {log.changeType}
                            </span>
                          </td>
                          <td className="p-3 text-sm text-gray-700">{log.description}</td>
                          <td className="p-3 text-sm text-gray-700">{log.requestedBy}</td>
                          <td className="p-3 text-sm text-gray-700">{log.approvedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>💡 คุณสามารถแก้ไขข้อมูลได้โดยตรง และ Export เป็น CSV เพื่อใช้งานใน Excel</p>
        </div>
      </div>
    </div>
  );
}

export default App;
