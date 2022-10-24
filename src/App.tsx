import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { toDoState } from "./atoms";
import Board from "./Componants/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info
    if (!destination) return
    if (destination?.droppableId === source.droppableId) {
      // 같은 Board에서 움직일 때

      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]]
        const taskObj = boardCopy[source.index]
        // 지우기
        boardCopy.splice(source.index, 1)
        // 추가하기
        boardCopy.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        }
      })
    }
    if (destination.droppableId !== source.droppableId) {
      // 다른 Board에서 움직일 때
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]
        const taskObj = sourceBoard[source.index]
        const destinationBoard = [...allBoards[destination.droppableId]]
        sourceBoard.splice(source.index, 1)
        destinationBoard.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        }
      })
    }
  }

  // const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
  //   if (!destination) return;
  //   setToDos((allBoards) => {
  //     const copyToDos: IToDoState = {};
  //     Object.keys(allBoards).forEach((toDosKey) => {
  //       copyToDos[toDosKey] = [...allBoards[toDosKey]];
  //     });
  //     copyToDos[source.droppableId].splice(source.index, 1);
  //     copyToDos[destination.droppableId].splice(destination.index, 0, draggableId);
  //     return copyToDos;
  //   });
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
