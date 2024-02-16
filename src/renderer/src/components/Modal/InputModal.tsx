import { cn } from '@renderer/utils'
import { useEffect, useRef, useState } from 'react'
import Input from '../Input'

interface InputModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: (input: string) => void
}

export default function InputModal({ isOpen, onClose, onAccept }: InputModalProps) {
  const [input, setInput] = useState('')

  const closeModal = () => {
    onClose()
    setInput('')
  }

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus()
    }
  }, [isOpen])

  return (
    <div className={cn('fixed z-10 inset-0 overflow-y-auto', isOpen ? 'block' : 'hidden')}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div onClick={closeModal} className="absolute inset-0 bg-zinc-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-zinc-700 p-3"></div>
          <div className="bg-zinc-400 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  className="text-lg text-center leading-6 text-white font-bold"
                  id="modal-headline"
                >
                  Create ToDo
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-center text-white">Write the title of your to do</p>
                </div>
                <div className="flex p-2 justify-center items-center">
                  <Input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-zinc-700 px-4 py-3 sm:px-6 sm:flex sm:justify-between space-y-2 sm:space-y-0">
            <button
              onClick={closeModal}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-900/50 text-base font-medium text-white hover:bg-zinc-200/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-700  sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onAccept(input)
                onClose()
              }}
              disabled={!input}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-zinc-200/50 text-base font-medium text-white hover:bg-zinc-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-700  sm:w-auto sm:text-sm disabled:opacity-50 disabled:hover:bg-zinc-200/50 disabled:cursor-not-allowed"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
