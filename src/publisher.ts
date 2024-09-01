import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', `pub-${randomBytes(4).toString('hex')}`, {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    const ticketData = {
      id: '123',
      title: 'Ticket #123',
      price: 19.99
    };
    await publisher.publish(ticketData);
  } catch (err) {
    console.error(err);
  }
});
