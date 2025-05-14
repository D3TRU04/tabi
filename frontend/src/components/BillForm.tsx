'use client';

import { useState, FormEvent } from 'react';
import { apiService } from '../services/api';
import { useAuthContext } from '../contexts/AuthContext';

interface BillFormProps {
  onSuccess: (bill: Bill) => void;
  onError: (msg: string) => void;
}

export default function BillForm({ onSuccess, onError }: BillFormProps) {
  const { user } = useAuthContext();
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('');
  const [participants, setParticipants] = useState<string[]>([]); // user IDs

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !total || participants.length < 1) {
      return onError('Title, total, and at least one participant required.');
    }

    try {
      const res = await apiService.createBill({
        title,
        total: parseFloat(total),
        participants,
      });
      onSuccess(res.bill);
      setTitle('');
      setTotal('');
      setParticipants([]);
    } catch (err: any) {
      onError(err.message);
    }
  };

  // For demo: you might fetch friend list here to choose participants
  // TODO: replace with real friend fetch
  const friendOptions = user?.friends || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Total Amount</label>
        <input
          type="number"
          value={total}
          onChange={e => setTotal(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Split With</label>
        <select
          multiple
          value={participants}
          onChange={e => {
            const opts = Array.from(e.target.selectedOptions).map(o => o.value);
            setParticipants(opts);
          }}
          className="mt-1 block w-full rounded-md border-gray-300"
        >
          {friendOptions.map(f => (
            <option key={f.id} value={f.id}>{f.email}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Create Bill
      </button>
    </form>
  );
}
