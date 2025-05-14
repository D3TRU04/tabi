// backend/scripts/testDb.ts
import prisma from '../src/db';

async function main() {
    console.log('=== USERS ===');
    console.table(await prisma.user.findMany({
        select: { id: true, email: true, createdAt: true }
    }));

    console.log('=== WALLETS ===');
    console.table(await prisma.wallet.findMany({
        select: { id: true, address: true, balance: true, userId: true }
    }));

    console.log('=== FRIENDS ===');
    console.table(await prisma.friend.findMany());

    console.log('=== TRANSACTIONS ===');
    console.table(await prisma.transaction.findMany());
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
