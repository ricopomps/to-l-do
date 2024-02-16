import { ToDo } from '@shared/models/todo'
import mongoose from 'mongoose'
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
    _id: new mongoose.Types.ObjectId().toString(),
    completed: false,
    lastEditTime: new Date().getTime(),
    title: 'Ração de Melu'
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    completed: false,
    lastEditTime: new Date().getTime(),
    title: 'Adicionar input de texto para os toDos',
    children: [
      {
        _id: new mongoose.Types.ObjectId().toString(),
        completed: false,
        lastEditTime: new Date().getTime(),
        title: 'Para o pai'
      },
      {
        _id: new mongoose.Types.ObjectId().toString(),
        completed: false,
        lastEditTime: new Date().getTime(),
        title: 'Para os filhos'
      }
    ]
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    completed: false,
    lastEditTime: new Date().getTime(),
    title: 'Movimentar to-dos?',
    colapsed: true
  },
  {
    _id: new mongoose.Types.ObjectId().toString(),
    completed: true,
    lastEditTime: new Date().getTime(),
    title: 'Caminhar',
    colapsed: false,
    children: [
      {
        _id: new mongoose.Types.ObjectId().toString(),
        completed: true,
        lastEditTime: new Date().getTime(),
        title: 'Volta interna',
        colapsed: false,
        children: [
          {
            _id: new mongoose.Types.ObjectId().toString(),
            completed: true,
            lastEditTime: new Date().getTime(),
            title: 'Volta externa',
            colapsed: true,
            children: [
              {
                _id: new mongoose.Types.ObjectId().toString(),
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
    _id: new mongoose.Types.ObjectId().toString(),
    completed: true,
    lastEditTime: new Date().getTime(),
    title: 'Regar as plantas'
  }
]
