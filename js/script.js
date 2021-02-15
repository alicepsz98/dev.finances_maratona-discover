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
  all: [
    {
      description: 'website',
      amount: -500,
      date: '23/09/1998'
    },
    {
      description: 'agua',
      amount: 300,
      date: '23/09/1998'
    },
    {
      description: 'website',
      amount: 500,
      date: '23/09/1998'
    }
  ],
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
  formatAmount() {
    value = Number(value) * 100
    return value
  },
  formatDate(date) {
    const splittedDate = date.split("-")
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },
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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),
  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },
  validateFields() {
    const { description, amount, date } = Form.getValues()
    if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
      throw new Error("Preencha todos os campos!")
    }
  },
  formatValues() {
    let { description, amount, date } = Form.getValues()
    amount = Utils.formatAmount(amount)
    date = Utils.formatDate()
    return {
      description,
      amount,
      date
    }
  },
  clearFields() {
    Form.description.value = ""
    Form.amount.value = ""
    Form.date.value = ""
  },
  submit(event) {
    event.preventDefault()
    try {
      Form.validateFields()
      const transaction = Form.formatValues()
      Transaction.add(transaction)
      Form.clearFields()
      Modal.close()
    } catch (err) {
      alert(err.message)
    }
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

