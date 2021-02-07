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

const transactions = []

const Transaction = {
  all: transactions,
  add(transaction) {
    Transaction.all.push(transaction)
    App.reload()
  },
  remove(index) {
    Transaction.all.splice(index, 1)
    App.reload()
  },
  incomes() {
    let income = 0
    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })
    return income
  },
  expenses() {
    let expense = 0
    Transaction.all.forEach(transaction => {
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
  },
  clearTransactions() {
    dom.transactionContainer.innerHTML = ""
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

const App = {
  init() {
    Transaction.all.forEach(transaction => dom.addTransaction(transaction))
    dom.updateBalance()
  },
  reload() {
    dom.clearTransactions()
    App.init()
  }
}

App.init()

Transaction.add(
  {
    description: "Telf",
    amount: 2000,
    date: "03/01/2022"
  }
)