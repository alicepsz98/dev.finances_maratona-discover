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
    let income = 0
    transactions.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })
    return income
  },
  expenses() {
    let expense = 0
    transactions.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })
    return expense
  },
  total() {
    return Transaction.incomes() + Transaction.expenses()
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
    amount: 1000,
    date: '23/02/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: 1000,
    date: '23/02/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: 1040,
    date: '23/02/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: 2390,
    date: '23/02/2021'
  }
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
    const amount = Utils.currencyFormat(transaction.amount)
    const html = `
      <td class="description">${transaction.description}</td>
      <td class=${cssClass}>${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Imagem de remoção de transação">
      </td>
    `
    return html
  },
  updateBalance() {
    document
      .getElementById('income-display')
      .innerHTML = Utils.currencyFormat(Transaction.incomes())
    document
      .getElementById('expense-display')
      .innerHTML = Utils.currencyFormat(Transaction.expenses())
    document
      .getElementById('total-display')
      .innerHTML = Utils.currencyFormat(Transaction.total())
  }
}

const Utils = {
  currencyFormat(value) {
    const signal = Number(value) < 0 ? "-" : ""
    value = String(value).replace(/\D/g, "")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    })
    return signal + value
  }
}

transactions.forEach(transaction => dom.addTransaction(transaction))
dom.updateBalance()