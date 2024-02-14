import { selectedToDoIndexAtom, toDosAtom } from '@renderer/store/todo'
import { useAtom, useAtomValue } from 'jotai'

export default function useToDosList({ onSelect }: { onSelect?: () => void }) {
  const toDos = useAtomValue(toDosAtom)
  const [selectedToDoIndex, setSelectedToDoIndex] = useAtom(selectedToDoIndexAtom)

  const handleToDoselect = (index: string) => async () => {
    console.log('handleToDoselect', index)
    setSelectedToDoIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    toDos,
    selectedToDoIndex,
    handleToDoselect
  }
}
