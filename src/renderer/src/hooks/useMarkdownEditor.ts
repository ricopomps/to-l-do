import { selectedNoteAtom } from '@renderer/store'
import { useAtomValue } from 'jotai'

export default function useMakdownEditor() {
  const selectedNote = useAtomValue(selectedNoteAtom)

  return {
    selectedNote
  }
}
