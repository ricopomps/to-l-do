import { ToDo } from '@shared/models/todo'
import { NoteInfo } from 'src/shared/models/note'

export const notesMock: NoteInfo[] = [
  {
    title: `Welcome 👋🏻`,
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 1',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 2',
    lastEditTime: new Date().getTime()
  },
  {
    title: 'Note 3',
    lastEditTime: new Date().getTime()
  }
]

export const toDoMock: ToDo[] = [
  {
    _id: '1',
    completed: false,
    lastEditTime: new Date().getTime(),
    title: 'Ração de Melu'
  },
  {
    _id: '2',
    completed: false,
    lastEditTime: new Date().getTime(),
    title: 'Lavar louça',
    children: [
      {
        _id: '6',
        completed: false,
        lastEditTime: new Date().getTime(),
        title: 'Lavar prato'
      },
      {
        _id: '7',
        completed: true,
        lastEditTime: new Date().getTime(),
        title: 'Lavar copo'
      },
      {
        _id: '8',
        completed: true,
        lastEditTime: new Date().getTime(),
        title: 'Lavar talher'
      }
    ]
  },
  {
    _id: '3',
    completed: false,
    lastEditTime: new Date().getTime(),
    title: 'Estudar',
    colapsed: true
  },
  {
    _id: '4',
    completed: true,
    lastEditTime: new Date().getTime(),
    title: 'Caminhar',
    colapsed: false,
    children: [
      {
        _id: '9',
        completed: true,
        lastEditTime: new Date().getTime(),
        title: 'Volta interna',
        colapsed: false,
        children: [
          {
            _id: '10',
            completed: true,
            lastEditTime: new Date().getTime(),
            title: 'Volta externa',
            colapsed: true,
            children: [
              {
                _id: '11',
                completed: true,
                lastEditTime: new Date().getTime(),
                title: 'Volta ambos',
                colapsed: false,
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: '5',
    completed: true,
    lastEditTime: new Date().getTime(),
    title: 'Regar as plantas'
  }
]
