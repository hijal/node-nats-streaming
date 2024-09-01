import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-event';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;

  queueGroupName = 'demo-application-service';

  // business logic
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log(`Received event data: ${JSON.stringify(data)}`);

    // sequence
    console.log(`Received event sequence: ${JSON.stringify(msg.getSequence())}`);
    console.log(`Ticket ID: ${data.id}`);
    console.log(`Ticket Title: ${data.title}`);
    console.log(`Ticket Price: ${data.price}`);

    // if everything is working as expected
    msg.ack();
  }
}
