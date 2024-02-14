import { appDirectoryName, fileEncoding } from '@shared/constants'
import { NoteInfo } from '@shared/models/note'
import { GetNotes, ReadNote, WriteNote } from '@shared/types'
import { ensureDir, readFile, readdir, stat, writeFile } from 'fs-extra'
import { homedir } from 'os'

export const getRootDir = () => {
  return `${homedir()}/${appDirectoryName}`
}

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()

  await ensureDir(rootDir)

  const notesFilesNames = await readdir(rootDir, {
    encoding: fileEncoding,
    withFileTypes: false
  })

  const notes = notesFilesNames.filter((fileName) => fileName.endsWith('.md'))

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename: string) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, {
    encoding: fileEncoding
  })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}
