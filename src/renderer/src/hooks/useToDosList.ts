import { selectedToDoIndexAtom } from '@renderer/store/todo'
import { useAtom } from 'jotai'

export default function useToDosList({ onSelect }: { onSelect?: () => void }) {
  const [selectedToDoIndex, setSelectedToDoIndex] = useAtom(selectedToDoIndexAtom)

  const handleToDoselect = (index: string) => async () => {
    setSelectedToDoIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    selectedToDoIndex,
    handleToDoselect
  }
}
