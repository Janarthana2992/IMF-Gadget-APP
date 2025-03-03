// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  // Create agent user
  const agentPassword = await bcrypt.hash('agent123', 10);
  await prisma.user.upsert({
    where: { username: 'agent' },
    update: {},
    create: {
      username: 'agent',
      password: agentPassword,
      role: 'agent',
    },
  });

  // Create some sample gadgets
  const gadgets = [
    {
      codename: 'The Midnight Hawk',
      name: 'Facial Recognition Glasses',
      description: 'Glasses that can identify and track targets in a crowd.',
      status: 'Available',
    },
    {
      codename: 'The Ghost Whisper',
      name: 'Ultrasonic Listening Device',
      description: 'Can pick up conversations through solid walls up to 50 meters away.',
      status: 'Deployed',
    },
    {
      codename: 'The Sapphire Oracle',
      name: 'Quantum Encryption Key',
      description: 'Unbreakable encryption device for secure communications.',
      status: 'Available',
    },
  ];

  for (const gadget of gadgets) {
    await prisma.gadget.upsert({
      where: { codename: gadget.codename },
      update: {},
      create: gadget,
    });
  }

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
