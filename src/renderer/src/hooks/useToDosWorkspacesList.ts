import { selectedToDosWorkspaceIdAtom, toDosWorkspacesAtom } from '@renderer/store/todo'
import { useAtom, useAtomValue } from 'jotai'

export default function useToDosWorkspacesList({ onSelect }: { onSelect?: () => void }) {
  const toDosWorkspaces = useAtomValue(toDosWorkspacesAtom)
  const [selectedToDosWorkspaceId, setSelectedToDosWorkspaceId] = useAtom(
    selectedToDosWorkspaceIdAtom
  )

  const handleToDosWorkspaceSelect = (id: string) => async () => {
    setSelectedToDosWorkspaceId(id)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    toDosWorkspaces,
    selectedToDosWorkspaceId,
    handleToDosWorkspaceSelect
  }
}
