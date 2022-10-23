import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
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
`

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`

const Card = styled.div`
  padding: 10px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardBgColor};
`

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState)

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return

    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos]
      // 지우기
      copyToDos.splice(source.index, 1)

      // 추가하기
      copyToDos.splice(destination?.index, 0, draggableId)

      return copyToDos
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId='one'>
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((todo, index) => (
                  <Draggable key={todo} draggableId={todo} index={index}>
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{todo}</Card>)}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>)}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
