import { Idl } from '@project-serum/anchor';

export interface PaymentAccount {
  authority: string;
  dailyLimit: number;
  lastPaymentDate: number;
  totalPaymentsToday: number;
}

export interface PaymentHistory {
  sender: string;
  receiver: string;
  amount: number;
  timestamp: number;
  memo: string;
}

export const IDL: Idl = {
  "version": "0.1.0",
  "name": "payment",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "paymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "updateDailyLimit",
      "accounts": [
        {
          "name": "paymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newLimit",
          "type": "u64"
        }
      ]
    },
    {
      "name": "sendPayment",
      "accounts": [
        {
          "name": "paymentAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "paymentHistory",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "senderTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "receiverTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sender",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "memo",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "PaymentAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "dailyLimit",
            "type": "u64"
          },
          {
            "name": "lastPaymentDate",
            "type": "i64"
          },
          {
            "name": "totalPaymentsToday",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "PaymentHistory",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "sender",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "memo",
            "type": "string"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "DailyLimitExceeded",
      "msg": "Daily payment limit exceeded"
    },
    {
      "code": 6001,
      "name": "InvalidAmount",
      "msg": "Invalid payment amount"
    },
    {
      "code": 6002,
      "name": "InsufficientBalance",
      "msg": "Insufficient balance for payment"
    }
  ]
}; 