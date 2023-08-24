export default class TicketRepository {
  constructor(dao) {
    this.dao = dao
  }

  async createTicket(purchaser, amount) {
    const newTicket = await this.dao.createTicket(purchaser, amount);
    return newTicket;
  }

}