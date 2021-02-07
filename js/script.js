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
    amount: -10000,
    date: '23/01/2021'
  },
]

