const Modal = {
  open() {
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close() {
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }
}


const Transaction = {
  incomes() {
    
  },
  expanses() {
    
  },
  total() {

  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Gás',
    amount: -7000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: 10000,
    date: '23/02/2021'
  },
  
]

const dom = {
  transactionContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = dom.innerHTMLTransaction(transaction)
    dom.transactionContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {
    const cssClass = transaction.amount > 0 ? "income" : "expense"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
        <td class="description">${transaction.description}</td>
        <td class=${cssClass}>${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
          <img src="./assets/minus.svg" alt="Imagem de remoção de transação">
        </td>
    `
    return html
  }
}

transactions.forEach(transaction => dom.addTransaction(transaction))
