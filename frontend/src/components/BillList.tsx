'use client';

import { apiService } from '../services/api';

interface BillListProps {
  bills: Bill[];
  onPaid: (shareId: string) => void;
}

export default function BillList({ bills, onPaid }: BillListProps) {
  if (!bills.length) {
    return <p>You have no bills or pending shares.</p>;
  }

  return (
    <div className="space-y-6">
      {bills.map(bill => (
        <div key={bill.id} className="border-b pb-4">
          <h3 className="font-semibold">{bill.title} — ${bill.total}</h3>
          <ul className="mt-2 space-y-1">
            {bill.shares.map(share => (
              <li key={share.id} className="flex justify-between">
                <span>
                  {share.userId === apiService.currentUserId()
                    ? 'You owe'
                    : `${share.userEmail} owes you`}
                  : ${share.amount.toFixed(2)}
                </span>
                {!share.paid && share.userId === apiService.currentUserId() && (
                  <button
                    onClick={async () => {
                      await apiService.payShare(share.id);
                      onPaid(share.id);
                    }}
                    className="text-blue-600"
                  >
                    Mark Paid
                  </button>
                )}
                {share.paid && <span className="text-green-600">Paid</span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
