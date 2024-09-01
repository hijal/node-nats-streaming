import dotenv from 'dotenv';
import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';

dotenv.config();

import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', `lis-${randomBytes(4).toString('hex')}`, {
  url: process.env.STAN_URL
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('Listener disconnected from NATS');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
